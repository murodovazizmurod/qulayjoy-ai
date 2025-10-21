import React, { useState } from 'react';
import { IconEye, IconEyeOff, IconUser, IconLock, IconPhone, IconX } from '@tabler/icons-react';
import { Modal, Button, TextInput, PasswordInput, Text, Divider, Stack, Box, List, ThemeIcon } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import * as AuthModules from '@/modules/auth';
import * as Fields from '@/shared/containers/fields';
import Spacer from '@/shared/components/Spacer';

import styles from './AuthModals.module.scss';

interface RegisterModalProps {
  opened: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ opened, onClose }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <Text className={styles.modalTitle}>{t('action_register', { ns: 'common' })}</Text>
            <Text className={styles.modalSubtitle}>
              {t('create_account', { ns: 'messages' })}
            </Text>
      </Box>

      <AuthModules.Forms.Register>
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

                <TextInput
                  placeholder={t('phone_number', { ns: 'profile' })}
                  size="md"
                  leftSection={<IconPhone size={20} />}
                  classNames={{
                    input: styles.inputField,
                  }}
                  {...register('phone')}
                  error={errors.phone?.message}
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

                <PasswordInput
                  placeholder={t('confirm_password', { ns: 'profile' })}
                  size="md"
                  leftSection={<IconLock size={20} />}
                  classNames={{
                    input: styles.inputField,
                  }}
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />

                    <Box className={styles.passwordRequirements}>
                      <Text className={styles.requirementTitle}>
                        {t('password_requirements', { ns: 'messages' })}
                      </Text>
                      <List spacing="xs" size="sm" className={styles.requirementList}>
                        <List.Item>
                          <Text size="sm">{t('min_8_chars', { ns: 'messages' })}</Text>
                        </List.Item>
                        <List.Item>
                          <Text size="sm">{t('one_uppercase', { ns: 'messages' })}</Text>
                        </List.Item>
                        <List.Item>
                          <Text size="sm">{t('one_number', { ns: 'messages' })}</Text>
                        </List.Item>
                      </List>
                    </Box>

                <Button 
                  fullWidth
                  size="md" 
                  disabled={isLoading} 
                  type="submit" 
                  variant="filled"
                  className={styles.submitButton}
                  loading={isLoading}
                >
                  {isLoading ? t('creating_account', { defaultValue: 'Creating account...' }) : t('action_register', { ns: 'common' })}
                </Button>
              </Stack>
            </Box>
          );
        }}
      </AuthModules.Forms.Register>
    </Modal>
  );
};

export default RegisterModal;
