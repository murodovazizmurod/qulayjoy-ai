import * as Components from '@mantine/core';
import * as Fields from '@/shared/containers/fields';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';

// styles
import cx from 'clsx';
import styles from '../Map.module.scss';
import { TablerIcon } from '@/shared/components/Icon/TablerIcon';
import { useTranslation } from 'react-i18next';

const Categories = () => {
  const { categories, isLoading } = ModuleHooks.useCategories();
  const { t } = useTranslation('filter');

  return (
    <Components.Input.Wrapper label={t('category')}>
      <div className={styles.filterbar_filter_btn_wrapper}>
        {!isLoading && Array.isArray(categories?.result) && categories.result.length > 0 ? (
          categories.result.map((item, index) => {
            return (
              <Fields.Button
                name="category"
                multiSelectable
                variant="outline"
                value={item.slug}
                className={styles.filterbar_items_wrapper_btn}
                leftSection={
                  <TablerIcon
                    name={item.icon || 'ti ti-building'}
                    className={cx(
                      styles.filter_form_btn_icon,
                      index > 1 ? styles.filter_form_btn_lg_icon : styles.filter_form_btn_md_icon
                    )}
                  />
                }
                key={item.slug}
              >
                {item.name}
              </Fields.Button>
            );
          })
        ) : (
          <Components.Group gap={12}>
            <Components.Skeleton height={41} w={99} className={styles.skeleton_btn} />
            <Components.Skeleton height={41} w={110} className={styles.skeleton_btn} />
            <Components.Skeleton height={41} w={140} className={styles.skeleton_btn} />
            <Components.Skeleton height={41} w={96} className={styles.skeleton_btn} />
            <Components.Skeleton height={41} w={144} className={styles.skeleton_btn} />
          </Components.Group>
        )}
      </div>
    </Components.Input.Wrapper>
  );
};

export default Categories;
