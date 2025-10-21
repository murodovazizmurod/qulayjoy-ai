import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// hooks
import { storage } from '@/core/services';
import { useTranslation } from 'react-i18next';
import * as AuthContext from '@/modules/auth/context';

// components
import Logo from './Logo';
import Menu from './Menu';
import * as Components from '@mantine/core';
import Button from '@/shared/components/Button';
import LanguageSwitcher from '@/shared/components/LanguageSwitcher';

// styles
import styles from './Header.module.scss';

import config from '@/config';
import { IconHome, IconUser } from '@tabler/icons-react';

interface UseAuthModalsReturn {
  loginOpened: boolean;
  registerOpened: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeLogin: () => void;
  closeRegister: () => void;
  closeAll: () => void;
}

interface HeaderProps {
  authModals?: UseAuthModalsReturn;
}

const Header = ({ authModals }: HeaderProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = AuthContext.useContext();

  const [isHide, setIsHide] = useState(false);
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => {
    setOpened(prev => !prev);
  };

  useEffect(() => {
    // Use the auth context state instead of just checking token once
    setIsHide(!state.isAuthenticated);
  }, [state.isAuthenticated]);

  return (
    <header className={styles.header}>
      <Logo />

      <Components.Group gap={5}>
        <LanguageSwitcher />

        {isHide && (
          <>
            <Button variant="outline" onClick={() => authModals?.openLogin()} className={styles.hide_on_mobile}>
              {t('action_login')}
            </Button>
            <Button variant="filled" onClick={() => authModals?.openRegister()} className={styles.hide_on_mobile}>
              {t('action_register', { ns: 'common' })}
            </Button>
          </>
        )}

        {!isHide && (
          <>
            <Button
              variant={pathname === '/' ? 'primary' : 'primary-outline'}
              onClick={() => navigate('/')}
              className={styles.hide_on_mobile}
              leftSection={<IconHome size={18} />}
            >
              {t('home')}
            </Button>
            <Button
              variant={pathname === '/profile' ? 'primary' : 'primary-outline'}
              className={styles.hide_on_mobile}
              onClick={() => navigate('/profile')}
              leftSection={<IconUser size={18} />}
            >
              {t('profile')}
            </Button>
          </>
        )}

        <Components.UnstyledButton
          className={styles.menu_hamburger}
          role="button"
          aria-label="menu"
          onClick={toggleMenu}
        >
          <div className={styles.hamburger_icon}>
            <div className={`${styles.icon_1} ${opened ? styles.a : ''}`}></div>
            <div className={`${styles.icon_2} ${opened ? styles.c : ''}`}></div>
            <div className={`${styles.icon_3} ${opened ? styles.b : ''}`}></div>
            {/* <div className={styles.clear}></div> */}
          </div>
        </Components.UnstyledButton>
      </Components.Group>

      {!!opened && <Menu open={opened} onClose={() => setOpened(false)} authModals={authModals} />}
    </header>
  );
};

export default Header;
