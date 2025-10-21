import { useTranslation } from 'react-i18next';

import Form from './components/Form';
import { FilterForm } from '@/modules/apartmentSearch/forms';
import AISearchButton from './components/AISearchButton';
import { useSearchFilters } from '@/core/context/searchFilters';

import { Group, Text } from '@mantine/core';
import Button from '@/shared/components/Button';
import { useNavigate } from 'react-router-dom';
import Spacer from '@/shared/components/Spacer';
import { IconSearch, IconMap } from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';

const Search = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { width } = useViewportSize();
  const { setFilters } = useSearchFilters();

  const handleAIResults = (results: any) => {
    console.log('AI Search Results:', results);
    // Handle AI search results here
    // You can navigate to results page or update the current search
  };

  const handleAIError = (error: string) => {
    console.error('AI Search Error:', error);
  };

  const handleSearchSuccess = (data: any, variables?: any) => {
    console.log('Search form submitted with variables:', variables);
    // Set the filters in context so List component can use them
    if (variables) {
      setFilters(variables);
    }
    // Scroll to the list section
    const listElement = document.getElementById('list-section');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FilterForm onSuccess={handleSearchSuccess}>
      {({ isLoading, reset }) => {
        return (
          <>
            <Group justify="space-between" w="100%" wrap="nowrap">
              <Text fz="xl" fw={600}>
                {t('filterbar_title', { ns: 'home' })}
              </Text>
              <AISearchButton 
                onResults={handleAIResults}
                onError={handleAIError}
                variant="outline"
                size="xs"
                fullWidth={false}
              />
            </Group>
            <Spacer size="md" />
            <Form />
            <Group align="center" wrap="nowrap" gap={10}>
              <Button
                htmlType="submit"
                variant="filled"
                loading={isLoading}
                disabled={isLoading}
                w={width > 992 ? '65%' : '50%'}
                leftSection={<IconSearch size={16} />}
              >
                {t('common_search')}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/map')}
                w={width > 992 ? '35%' : '50%'}
                leftSection={<IconMap size={16} />}
              >
                {t('view_in_map')}
              </Button>
            </Group>
          </>
        );
      }}
    </FilterForm>
  );
};


export default Search;
