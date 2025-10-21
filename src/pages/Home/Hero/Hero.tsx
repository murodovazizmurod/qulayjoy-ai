import Search from './Search';
import { useTranslation } from 'react-i18next';

// components
import Spacer from '@/shared/components/Spacer';

// styles
import styles from './Hero.module.scss';

const Hero = () => {
  const { t } = useTranslation('home');

  return (
    <div className={styles.hero_container}>
      <div className={styles.main_title}>
        <h1 className={styles.main_title_title}>{t('hero_title')}</h1>
        <p className={styles.main_title_slogan}>{t('hero_subtitle')}</p>
      </div>
      <Spacer size="lg" />
      <div className={styles.filter_form}>
        <Search />
      </div>
      <Spacer size="sm" />
    </div>
  );
};

export default Hero;
