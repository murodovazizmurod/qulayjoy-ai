import { useNavigate } from 'react-router-dom';

// styles
import styles from './Header.module.scss';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.header_logo} onClick={() => navigate('/')}>
      QulayJoy
    </div>
  );
};

export default Logo;
