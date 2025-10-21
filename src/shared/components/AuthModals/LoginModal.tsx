import React, { useState } from 'react';
import { IconEye, IconEyeOff, IconUser, IconLock, IconX } from '@tabler/icons-react';
import { Modal, Group, Button, TextInput, PasswordInput, Text, Divider, Stack, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import * as AuthModules from '@/modules/auth';
import * as Fields from '@/shared/containers/fields';
import Spacer from '@/shared/components/Spacer';

import styles from './AuthModals.module.scss';

interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ opened, onClose }) => {
  const { t } = useTranslation('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={null}
      centered
      size="md"
      withCloseButton={false}
      classNames={{
        content: styles.modalContent,
        body: styles.modalBody,
      }}
    >
      <Box className={styles.modalHeader}>
        <Button
          variant="subtle"
          color="white"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
          size="sm"
        >
          <IconX size={20} />
        </Button>
        <Text className={styles.modalTitle}>{t('action_login')}</Text>
            <Text className={styles.modalSubtitle}>
              {t('welcome_back', { ns: 'messages' })}
            </Text>
      </Box>

      <AuthModules.Forms.Login>
        {(formProps) => {
          const { isLoading: formLoading, register, formState: { errors } } = formProps;
          handleLoadingChange(formLoading || false);
          
          return (
            <Box className={styles.formInner}>
              <Stack gap="md">
                <TextInput
                  placeholder={t('username', { ns: 'profile' })}
                  size="md"
                  leftSection={<IconUser size={20} />}
                  classNames={{
                    input: styles.inputField,
                  }}
                  {...register('userName')}
                  error={errors.userName?.message}
                />

                    <PasswordInput
                      placeholder={t('password', { ns: 'profile' })}
                      size="md"
                      leftSection={<IconLock size={20} />}
                      classNames={{
                        input: styles.inputField,
                      }}
                      {...register('password')}
                      error={errors.password?.message}
                    />

                    <Button 
                      fullWidth
                      size="md" 
                      disabled={isLoading} 
                      type="submit" 
                      variant="filled"
                      className={styles.submitButton}
                      loading={isLoading}
                    >
                      {isLoading ? t('signing_in', { defaultValue: 'Signing in...' }) : t('action_login')}
                    </Button>
              </Stack>
            </Box>
          );
        }}
      </AuthModules.Forms.Login>
    </Modal>
  );
};

export default LoginModal;
