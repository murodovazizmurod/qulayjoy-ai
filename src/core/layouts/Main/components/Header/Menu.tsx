import * as Components from '@mantine/core';
import Button from '@/shared/components/Button';

import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as AuthContext from '@/modules/auth/context';

interface UseAuthModalsReturn {
  loginOpened: boolean;
  registerOpened: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeLogin: () => void;
  closeRegister: () => void;
  closeAll: () => void;
}

interface IProps {
  open: boolean;
  onClose: () => void;
  authModals?: UseAuthModalsReturn;
}

const Menu = ({ open, onClose, authModals }: IProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state } = AuthContext.useContext();
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    // Use the auth context state instead of just checking token once
    setIsHide(!state.isAuthenticated);
  }, [state.isAuthenticated]);

  return (
    <Components.Drawer opened={open} onClose={onClose} size="100%" withCloseButton={false} className={styles.drawer}>
      <Components.Group className={styles.menu}>
        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) => (isActive ? styles.menu_active : styles.menu_nav_item)}
        >
          {t('home')}
        </NavLink>

        <NavLink
          to="/map"
          onClick={onClose}
          className={({ isActive }) => (isActive ? styles.menu_active : styles.menu_nav_item)}
        >
          {t('map')}
        </NavLink>
        {!isHide && (
          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) => (isActive ? styles.menu_active : styles.menu_nav_item)}
          >
            {t('profile')}
          </NavLink>
        )}
            {isHide && (
              <Components.Group justify="center" align="center" gap="md">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    authModals?.openLogin();
                    onClose(); // Close the mobile menu
                  }}
                >
                  {t('action_login')}
                </Button>
                <Button 
                  variant="filled" 
                  onClick={() => {
                    authModals?.openRegister();
                    onClose(); // Close the mobile menu
                  }}
                >
                  {t('action_register', { ns: 'common' })}
                </Button>
              </Components.Group>
            )}
      </Components.Group>
    </Components.Drawer>
  );
};

export default Menu;
