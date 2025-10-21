import { Outlet } from 'react-router-dom';
import * as LayoutComponents from './components';
import AuthModals from '@/shared/components/AuthModals';
import { useAuthModals } from '@/shared/hooks/useAuthModals';

// styles
import styles from './Main.module.scss';

const Main = () => {
  const authModals = useAuthModals();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LayoutComponents.Header authModals={authModals} />
        <Outlet />
        <LayoutComponents.Footer />
      </div>
      
      <AuthModals
        loginOpened={authModals.loginOpened}
        registerOpened={authModals.registerOpened}
        onLoginClose={authModals.closeLogin}
        onRegisterClose={authModals.closeRegister}
      />
    </div>
  );
};

export default Main;
