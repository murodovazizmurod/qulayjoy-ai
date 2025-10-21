import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Group, Text } from '@mantine/core';
import { IconBrain, IconSparkles } from '@tabler/icons-react';

import AISearchModal from './AISearchModal';
import styles from '../Hero.module.scss';

interface AISearchButtonProps {
  onResults?: (results: any) => void;
  onError?: (error: string) => void;
  variant?: 'filled' | 'outline' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

const AISearchButton = ({ 
  onResults, 
  onError, 
  variant = 'filled',
  size = 'md',
  fullWidth = true,
  style
}: AISearchButtonProps) => {
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = useState(false);

  const handleResults = (results: any) => {
    onResults?.(results);
    // Don't close the modal automatically - let user browse results
  };

  const handleError = (error: string) => {
    onError?.(error);
  };

  return (
    <>
      <Button
        variant="filled"
        size={size}
        fullWidth={fullWidth}
        onClick={() => setModalOpened(true)}
        leftSection={
          <Group gap="xs" wrap="nowrap">
            <IconSparkles size={20} />
          </Group>
        }
        gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #8b5cf6 100%)',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '16px',
          height: '46px',
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
          ...style
        }}
        className={styles.ai_search_button}
      >
        <Group gap="sm" wrap="nowrap" justify="center">
          <Text 
            size="md" 
            fw={500}
          >
            {t('ai_search_button', { ns: 'home', defaultValue: 'AI qidiruv' })}
          </Text>
        </Group>
      </Button>

      <AISearchModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onResults={handleResults}
        onError={handleError}
      />
    </>
  );
};

export default AISearchButton;
