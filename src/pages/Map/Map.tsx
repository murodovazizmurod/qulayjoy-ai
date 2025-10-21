import Filter from './Filter';
import { YandexMap } from './YMap';
import styles from './Map.module.scss';

export const Map = () => {
  return (
    <>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Filter />
        </aside>

        <main className={styles.map_area}>
          <YandexMap />
        </main>
      </div>
    </>
  );
};
