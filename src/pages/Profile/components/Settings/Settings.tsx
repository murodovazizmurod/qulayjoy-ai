import * as Components from '@mantine/core';
import { IconLogout, IconStar } from '@tabler/icons-react';

import styles from '../../Profile.module.scss';
import Button from '@/shared/components/Button';
import { useNavigate } from 'react-router-dom';

import { message } from '@/shared/components/Message';

import config from '@/config';
import { storage } from '@/core/services';
import * as Context from '@/modules/auth/context';
import type { User } from '@/modules/settings';
import { useTranslation } from 'react-i18next';

interface Props {
  value: User.Profile.Types.IEntity.User;
}

const Settings = ({ value }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { methods } = Context.useContext();
  const activePlan = value.active_subscription;

  const handleLogout = () => {
    storage.local.remove(config.api.accessTokenKey);

    methods.setIsAuthenticated(false);
    methods.setAccessToken('');

    navigate('/');
    message.info(t('logout_success', { ns: 'messages' }));
  };

  return (
    <div className={styles.tabs_panel}>
      <Components.Title order={4} mb="lg">
        {t('settings', { ns: 'profile' })}
      </Components.Title>

      <Components.Group className={styles.subscribe_section} my="md">
        <div>
          <Components.Text fw={500} className={styles.subscribe_section_title}>
            {activePlan?.plan
              ? `${t('your_plan', { ns: 'profile' })}: ${activePlan.plan}`
              : t('buy_plan', { ns: 'profile' })}
          </Components.Text>
          {activePlan && (
            <Components.Text fz="sm" c="dimmed">
              {t('valid_until', { ns: 'profile' })}: {new Date(activePlan.ends_at).toLocaleDateString()}
            </Components.Text>
          )}
        </div>
        <Button
          variant="outline"
          c="yellow"
          leftSection={<IconStar size={16} />}
          onClick={() => navigate('/subscribe')}
          className={styles.subscribe_section_btn}
        >
          {activePlan ? t('update', { ns: 'profile' }) : t('buy_plan', { ns: 'profile' })}
        </Button>
      </Components.Group>

      <Components.Group gap={0} className={styles.settings_list}>
        <Components.Group className={styles.item}>
          <Components.Text fw={500}>{t('dark_mode', { ns: 'profile' })}</Components.Text>
          <Components.Switch size="md" />
        </Components.Group>
      </Components.Group>

      <Components.Group justify="center" align="center" w="100%" mt="md">
        <Button
          variant="filled"
          w="100%"
          bg="red"
          leftSection={<IconLogout size={16} />}
          onClick={handleLogout}
          className={styles.settings_list_btn}
        >
          {t('logout', { ns: 'profile' })}
        </Button>
      </Components.Group>
    </div>
  );
};

export default Settings;
