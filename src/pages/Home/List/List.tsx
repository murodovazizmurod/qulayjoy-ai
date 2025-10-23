import * as React from 'react';
import * as Scroll from 'react-scroll';
import * as Hooks from '@mantine/hooks';
import * as Components from '@mantine/core';
import * as Translation from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import * as Types from '@/modules/apartmentSearch/types';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';

import Filter from './Filter';
import Modal from './components/CardModal/Modal';
import Card from '@/shared/components/Card';
import Button from '@/shared/components/Button';
import { FilterModal } from '@/pages/Home/List/components/FilterModal';
import { useAuthModals } from '@/shared/hooks/useAuthModals';
import { EfficientList } from '@/shared/components/EfficientList/EfficientList';
import { useSearchFilters } from '@/core/context/searchFilters';

// styles
import cx from 'clsx';
import styles from './List.module.scss';
import { IconFilter, IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';

const List = React.memo(() => {
  const { width } = Hooks.useViewportSize();
  const { t } = Translation.useTranslation('home');
  const authModals = useAuthModals();
  const { filters } = useSearchFilters();
  const [layout, setLayout] = React.useState<'horizontal' | 'vertical'>('vertical');
  const [filterbarView, setFilterbarView] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFilters, setCurrentFilters] = React.useState<Types.IForm.ApartmentsFilterQuery | undefined>(undefined);
  const apartmentId = searchParams.get('apartmentId');
  
  // Use filters from context if available, otherwise use currentFilters
  const activeFilters = filters || currentFilters;
  
  const { apartments } = ModuleHooks.useApartments({ values: activeFilters });

  const { apartment: selectedCard, isLoading } = ModuleHooks.useApartment({
    id: Number(apartmentId),
    enabled: !!apartmentId
  });

  const handleCardClick = React.useCallback((item: Types.IEntity.Apartment) => {
    setSearchParams({ apartmentId: String(item.id) });
  }, [setSearchParams]);

  const handleCloseModal = React.useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const handleLayoutChange = React.useCallback((newLayout: 'horizontal' | 'vertical') => {
    setLayout(newLayout);
  }, []);

  const handleFilterToggle = React.useCallback(() => {
    setFilterbarView(!filterbarView);
  }, [filterbarView]);

  const handleFilterUpdate = React.useCallback((filters: Types.IForm.ApartmentsFilterQuery) => {
    setCurrentFilters(filters);
  }, []);

  return (
    <Scroll.Element className={styles.list_container} name="list-section">
      <div className={styles.top_actions_wrapper}>
        <div className={styles.title}>{t('all_apartments_list')}</div>
        <div className={styles.actions}>
          <Button
            leftSection={<IconFilter />}
            variant={filterbarView ? 'filled' : 'outline'}
            onClick={handleFilterToggle}
          >
            {t('action_filter', { ns: 'common' })}
          </Button>
          <Components.Group className={styles.actions_layout_btn_wrapper} gap={0}>
            <Button
              onClick={() => handleLayoutChange('vertical')}
              variant={layout === 'vertical' ? 'filled' : 'outline'}
              className={cx(styles.actions_btn, styles.actions_grid)}
            >
              <IconLayoutGrid className={styles.actions_icon} />
            </Button>
            <Button
              onClick={() => handleLayoutChange('horizontal')}
              variant={layout === 'horizontal' ? 'filled' : 'outline'}
              className={cx(styles.actions_btn, styles.actions_list)}
            >
              <IconLayoutList className={styles.actions_icon} />
            </Button>
          </Components.Group>
        </div>
      </div>
      <section className={styles.section_wrapper}>
        {width > 992 && (
          <aside className={cx(styles.aside, filterbarView ? styles.aside_open : styles.aside_closed)}>
            <Filter onFilterUpdate={handleFilterUpdate} />
          </aside>
        )}
        <div className={cx(styles[`${layout}_section`])}>
          <EfficientList
            items={apartments.result}
            renderItem={(item, index) => (
              <Card 
                key={item.id} 
                layout={layout} 
                values={item} 
                onClick={() => handleCardClick(item)} 
              />
            )}
            itemHeight={layout === 'vertical' ? 300 : 200}
            maxVisibleItems={20}
          />
        </div>
      </section>
      {apartmentId && (
        <Modal opened={!!apartmentId} selectedCard={selectedCard} isLoading={isLoading} onClose={handleCloseModal} authModals={authModals} />
      )}
      {width < 992 && !!filterbarView && (
        <FilterModal opened={!!filterbarView} onClose={() => setFilterbarView(false)} onFilterUpdate={handleFilterUpdate} />
      )}
    </Scroll.Element>
  );
});

export default List;
