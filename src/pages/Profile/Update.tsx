import * as User from '@/modules/settings/user';
import { message } from '@/shared/components/Message';

import Form from './components/Form/Form';
import { Group, Title } from '@mantine/core';
import Button from '@/shared/components/Button';

import styles from './Profile.module.scss';
import { useTranslation } from 'react-i18next';

const Update = ({ value }: { value: User.Profile.Types.IEntity.User }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabs_panel}>
      <Title order={4} className={styles.tabs_panel_title}>
        {t('personal_info', { ns: 'profile' })}
      </Title>
      <User.Profile.Forms.Update
        values={value}
        onSuccess={() => message.success(t('profile_updated', { ns: 'messages' }))}
      >
        {({ isLoading, formState }) => {
          const { isDirty } = formState;

          return (
            <>
              <Form />
              <Group gap={6} mt="xl">
                <Button htmlType="submit" disabled={isLoading || !isDirty}>
                  {!isLoading ? t('action_save', { ns: 'common' }) : t('saving', { ns: 'common' })}
                </Button>
              </Group>
            </>
          );
        }}
      </User.Profile.Forms.Update>
    </div>
  );
};

export default Update;
