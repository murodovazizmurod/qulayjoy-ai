import { useState, useCallback } from 'react';

interface UseAuthModalsReturn {
  loginOpened: boolean;
  registerOpened: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeLogin: () => void;
  closeRegister: () => void;
  closeAll: () => void;
}

export const useAuthModals = (): UseAuthModalsReturn => {
  const [loginOpened, setLoginOpened] = useState(false);
  const [registerOpened, setRegisterOpened] = useState(false);

  const openLogin = useCallback(() => {
    setLoginOpened(true);
    setRegisterOpened(false);
  }, []);

  const openRegister = useCallback(() => {
    setRegisterOpened(true);
    setLoginOpened(false);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpened(false);
  }, []);

  const closeRegister = useCallback(() => {
    setRegisterOpened(false);
  }, []);

  const closeAll = useCallback(() => {
    setLoginOpened(false);
    setRegisterOpened(false);
  }, []);

  return {
    loginOpened,
    registerOpened,
    openLogin,
    openRegister,
    closeLogin,
    closeRegister,
    closeAll,
  };
};
