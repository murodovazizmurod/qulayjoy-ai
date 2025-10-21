// hooks
import { useEffect, useState } from 'react';
import { useProfile } from '@/modules/settings/user/profile/hooks';

// sections
import Update from './Update';
import Settings from './components/Settings/Settings';
import Favorites from './components/Favorites/Favorites';

import * as Components from '@mantine/core';
import Splash from '@/shared/components/Splash';

// styles
import styles from './Profile.module.scss';

// icons
import { storage } from '@/core/services';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconUser, IconHeart, IconSettings } from '@tabler/icons-react';

export const Profile = () => {
  const navigate = useNavigate();
  const profileData = useProfile();
  const { t } = useTranslation('profile');
  const user = profileData && 'user' in profileData ? profileData.user : undefined;
  const isLoading = profileData && 'isLoading' in profileData ? profileData.isLoading : false;

  const token = storage.local.get('accessToken');

  useEffect(() => {
    if (!token) navigate('/');
  }, [token]);

  const [value, setValue] = useState<string | null>('1');
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  if (isLoading) {
    return <Splash />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.main_wrapper}>
        <Components.Group mb="xl" justify="flex-start" w="100%">
          <Components.Avatar size={80} radius="50%" className={styles.avatar}>
            <p className={styles.avatar_text}>{`${user?.first_name?.charAt(0) ?? '' + user?.last_name?.charAt(0)}`}</p>
          </Components.Avatar>
          <div>
            <Components.Title className={styles.first_name}>{user?.first_name}</Components.Title>
            <Components.Group>
              <Components.Badge color="gray" variant="light" mt={4}>
                {user?.profile?.role}
              </Components.Badge>
              {user?.active_subscription && (
                <Components.Badge color="green" variant="light" mt={4}>
                  {user?.active_subscription.plan}
                </Components.Badge>
              )}
            </Components.Group>
          </div>
        </Components.Group>

        <Components.Tabs variant="none" value={value} onChange={setValue} w="100%" h="100%">
          <Components.Tabs.List ref={setRootRef} className={styles.list}>
            <Components.Tabs.Tab
              value="1"
              ref={setControlRef('1')}
              leftSection={<IconUser size={16} />}
              className={styles.tab}
            >
              {t('profile')}
            </Components.Tabs.Tab>
            <Components.Tabs.Tab
              value="2"
              ref={setControlRef('2')}
              leftSection={<IconHeart size={16} />}
              className={styles.tab}
            >
              {t('favorites')}
            </Components.Tabs.Tab>
            <Components.Tabs.Tab
              value="3"
              ref={setControlRef('3')}
              leftSection={<IconSettings size={16} />}
              className={styles.tab}
            >
              {t('settings')}
            </Components.Tabs.Tab>

            <Components.FloatingIndicator
              parent={rootRef}
              className={styles.indicator}
              target={value ? controlsRefs[value] : null}
            />
          </Components.Tabs.List>

          <Components.Tabs.Panel value="1">{!!user && <Update value={user} />}</Components.Tabs.Panel>
          <Components.Tabs.Panel value="2">
            <Favorites />
          </Components.Tabs.Panel>
          <Components.Tabs.Panel value="3">{user && <Settings value={user} />}</Components.Tabs.Panel>
        </Components.Tabs>
      </div>
    </div>
  );
};
