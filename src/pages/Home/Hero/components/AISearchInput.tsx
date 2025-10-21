import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, Button, Group, Text, Alert } from '@mantine/core';
import { IconSearch, IconRobot, IconInfoCircle, IconBrain } from '@tabler/icons-react';

import { useAISearch } from '@/modules/apartmentSearch/hooks';
import Spacer from '@/shared/components/Spacer';

interface AISearchInputProps {
  onResults?: (results: any) => void;
  onError?: (error: string) => void;
}

const AISearchInput = ({ onResults, onError }: AISearchInputProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { data: aiResults, isLoading, error } = useAISearch({
    query,
    enabled: isSearching && query.trim().length > 0
  });

  const handleSearch = () => {
    if (query.trim().length > 0) {
      setIsSearching(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle results when they come back
  useEffect(() => {
    if (aiResults && isSearching) {
      if (aiResults.success) {
        onResults?.(aiResults);
      } else {
        onError?.(aiResults.message || 'AI search failed');
      }
      setIsSearching(false);
    }
  }, [aiResults, isSearching, onResults, onError]);

  // Handle errors
  useEffect(() => {
    if (error && isSearching) {
      onError?.('Network error occurred');
      setIsSearching(false);
    }
  }, [error, isSearching, onError]);

  return (
    <div>
      <Text size="sm" fw={500} mb="xs" c="dimmed">
        {t('ai_search_title', { ns: 'home', defaultValue: 'AI-Powered Search' })}
      </Text>
      
      <Group gap="xs" align="flex-start">
        <TextInput
          placeholder={t('ai_search_placeholder', { 
            ns: 'home', 
            defaultValue: 'Describe what you\'re looking for... (e.g., "apartment near metro station")' 
          })}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          leftSection={<IconRobot size={16} />}
          style={{ flex: 1 }}
          disabled={isLoading}
        />
        
        <Button
          onClick={handleSearch}
          loading={isLoading}
          disabled={!query.trim() || isLoading}
          leftSection={<IconBrain size={16} />}
        >
          {t('common_search')}
        </Button>
      </Group>

      {aiResults && aiResults.success && (
        <>
          <Spacer size="sm" />
          <Alert
            icon={<IconInfoCircle size={16} />}
            title={t('ai_search_results', { ns: 'home', defaultValue: 'AI Search Results' })}
            color="blue"
            variant="light"
          >
            <Text size="sm">
              {t('ai_search_found', { 
                ns: 'home', 
                defaultValue: 'Found {{count}} apartments matching your criteria',
                count: aiResults.results.count 
              })}
            </Text>
            {aiResults.suggestions && aiResults.suggestions.length > 0 && (
              <Text size="xs" c="dimmed" mt="xs">
                {t('ai_search_suggestions', { ns: 'home', defaultValue: 'Suggestions' })}: {aiResults.suggestions.join(', ')}
              </Text>
            )}
          </Alert>
        </>
      )}

      {aiResults && !aiResults.success && (
        <>
          <Spacer size="sm" />
          <Alert
            icon={<IconInfoCircle size={16} />}
            title={t('ai_search_error', { ns: 'home', defaultValue: 'Search Error' })}
            color="red"
            variant="light"
          >
            <Text size="sm">
              {aiResults.message || t('ai_search_error_message', { 
                ns: 'home', 
                defaultValue: 'Unable to process your search. Please try again.' 
              })}
            </Text>
          </Alert>
        </>
      )}
    </div>
  );
};

export default AISearchInput;
