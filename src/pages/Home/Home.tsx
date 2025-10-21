// sections
import HeroSection from './Hero/Hero';
import ListSection from './List/List';

// components
import Spacer from '@/shared/components/Spacer';
import { SearchFiltersProvider } from '@/core/context/searchFilters';

// styles
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <SearchFiltersProvider>
      <div className={styles.container}>
        <HeroSection />
        <Spacer size={120} />
        <div id="list-section" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ListSection />
        </div>
      </div>
    </SearchFiltersProvider>
  );
};
