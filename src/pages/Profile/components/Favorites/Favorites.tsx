import * as Components from '@mantine/core';

// styles
import styles from './Favourites.module.scss';
import { useFavoriteList } from '@/modules/settings/user/profile/hooks';
import Card from '@/shared/components/Card';
import cx from 'clsx';
import { useTranslation } from 'react-i18next';

const Favorites = () => {
  const { items } = useFavoriteList();
  const { t } = useTranslation('profile');
  return (
    <div className={styles.tabs_panel}>
      <Components.Title order={4} mb="lg">
        {t('favorites')}
      </Components.Title>
      <section className={styles.section_wrapper}>
        <div className={cx(styles[`vertical_section`])}>
          {items?.results.map(item => (
            <Card key={item.id} layout="vertical" values={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
