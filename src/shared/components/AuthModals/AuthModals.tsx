import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { storage } from '@/core/services';
import config from '@/config';

interface AuthModalsProps {
  loginOpened: boolean;
  registerOpened: boolean;
  onLoginClose: () => void;
  onRegisterClose: () => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({
  loginOpened,
  registerOpened,
  onLoginClose,
  onRegisterClose,
}) => {
  const [currentModal, setCurrentModal] = useState<'login' | 'register'>('login');

  // Check for successful authentication and close modals
  useEffect(() => {
    const checkAuthAndClose = () => {
      const token = storage.local.get(config.api.accessTokenKey);
      if (token && (loginOpened || registerOpened)) {
        // Add a small delay to ensure the auth state is properly updated
        setTimeout(() => {
          onLoginClose();
          onRegisterClose();
          setCurrentModal('login'); // Reset to login for next time
        }, 100);
      }
    };

    // Check immediately
    checkAuthAndClose();

    // Also check periodically while modals are open
    const interval = setInterval(checkAuthAndClose, 500);

    return () => clearInterval(interval);
  }, [loginOpened, registerOpened, onLoginClose, onRegisterClose]);

  // Reset currentModal when modals are opened
  useEffect(() => {
    if (loginOpened) {
      setCurrentModal('login');
    } else if (registerOpened) {
      setCurrentModal('register');
    }
  }, [loginOpened, registerOpened]);

  const handleLoginClose = () => {
    setCurrentModal('login'); // Reset to login for next time
    onLoginClose();
  };

  const handleRegisterClose = () => {
    setCurrentModal('login'); // Reset to login for next time
    onRegisterClose();
  };

  return (
    <>
      <LoginModal
        opened={loginOpened && currentModal === 'login'}
        onClose={handleLoginClose}
      />
      <RegisterModal
        opened={registerOpened && currentModal === 'register'}
        onClose={handleRegisterClose}
      />
    </>
  );
};

export default AuthModals;
