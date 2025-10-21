import { useLocation, useNavigate } from 'react-router-dom';

// styles
import styles from './TempPage.module.scss';

// components
import { Button } from '@/shared/components/Button/Button';

const TempPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.temp_page}>
      <div className={styles.temp_page_title}>{pathname.toUpperCase().slice(1)} page coming soon...</div>
      <Button onClick={() => navigate('/')} size="lg">
        Back to Home page
      </Button>
    </div>
  );
};

export default TempPage;
