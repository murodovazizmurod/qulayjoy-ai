import * as Components from '@mantine/core';
import * as Forms from '@/modules/apartmentSearch/forms';

import Form from './components/Form/Form';
import Button from '@/shared/components/Button';
import Spacer from '@/shared/components/Spacer';
import AISearchButton from '@/pages/Home/Hero/components/AISearchButton';

// styles
import styles from './List.module.scss';
import { useTranslation } from 'react-i18next';
import { IconX } from '@tabler/icons-react';

interface IProps {
  onClose?: () => void;
  onFilterUpdate?: (filters: any) => void;
}

const Filter = ({ onClose, onFilterUpdate }: IProps) => {
  const { t } = useTranslation();

  const handleAIResults = (results: any) => {
    console.log('AI Search Results:', results);
    // Handle AI search results - you can update filters or navigate
    if (onFilterUpdate && results.filters) {
      onFilterUpdate(results.filters);
    }
  };

  const handleAIError = (error: string) => {
    console.error('AI Search Error:', error);
  };

  return (
    <div className={styles.filterbar}>
      <Forms.FilterForm
        onSuccess={(data: any, variables?: any) => {
          if (onFilterUpdate && variables) onFilterUpdate(variables);
          if (onClose) onClose();
        }}
      >
        {({ isLoading, reset }) => {
          return (
            <>
              <Components.Group align="center" justify="space-between" gap={8} wrap="nowrap">
                <Components.Text className={styles.filterbar_title}>
                  {t('extra_filters', { ns: 'common' })}
                </Components.Text>
                <AISearchButton 
                  onResults={handleAIResults}
                  onError={handleAIError}
                  variant="outline"
                  size="xs"
                  fullWidth={false}
                />
              </Components.Group>

              <Spacer size="md" />

              <Form />
              
              <Components.Group gap="sm" mt="xl">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => reset()}
                  leftSection={<IconX size={16} />}
                  className={styles.filterbar_clear_btn}
                  flex={1}
                >
                  {t('common_clear', { ns: 'common' })}
                </Button>
                <Button 
                  htmlType="submit" 
                  variant="filled" 
                  loading={isLoading} 
                  disabled={isLoading} 
                  flex={2}
                >
                  {t('common_search', { ns: 'common' })}
                </Button>
              </Components.Group>
            </>
          );
        }}
      </Forms.FilterForm>
    </div>
  );
};

export default Filter;
