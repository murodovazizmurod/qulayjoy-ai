// fields
import * as Fields from '@/shared/containers/fields';

import Spacer from '@/shared/components/Spacer';
import { Group, Skeleton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import React, { useMemo, useCallback } from 'react';

import Subway from '@/pages/Home/List/components/Form/Subway';
import Regions from '../../List/components/Form/Regions';
import PriceRange from '../../List/components/Form/PriceRange';

// hooks
import { useCategories } from '@/modules/apartmentSearch/hooks';

// styles
import cx from 'clsx';
import styles from '../Hero.module.scss';
import { TablerIcon } from '@/shared/components/Icon/TablerIcon';
import { IconX } from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';

const Form = React.memo(() => {
  const { categories, isLoading } = useCategories();
  const { t } = useTranslation();

  const categoryButtons = useMemo(() => {
    if (isLoading || !Array.isArray(categories?.result) || categories.result.length === 0) {
      return null;
    }

    return categories.result.map((item, index) => (
      <Fields.Button
        name="category"
        variant="outline"
        multiSelectable
        value={item.slug}
        leftSection={
          <TablerIcon
            name={item.icon}
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
    ));
  }, [categories, isLoading]);

  const skeletonButtons = useMemo(() => (
    <Group gap={10}>
      <Skeleton height={42} w={91} className={styles.skeleton_btn} />
      <Skeleton height={42} w={106} className={styles.skeleton_btn} />
      <Skeleton height={42} w={134} className={styles.skeleton_btn} />
      <Skeleton height={42} w={93} className={styles.skeleton_btn} />
      <Skeleton height={42} w={142} className={styles.skeleton_btn} />
    </Group>
  ), []);

  return (
    <Group gap={8}>
      {categoryButtons}
      {isLoading && skeletonButtons}
      <ClearButton />

      <Spacer size={4} />

      <Group align="center" wrap="nowrap" w="100%" gap={12} className={styles.inputs}>
        <div className={styles.inputs_regions}>
          <Regions />
          <Subway />
        </div>
        <PriceRange />
      </Group>

      <Spacer size={6} />
      
      <Spacer size={10} />
    </Group>
  );
});

// Component to check if filters are applied and render clear button accordingly
const ClearButton = () => {
  const { watch, reset } = useFormContext();
  const watchedValues = watch();
  
  // Check if any filter values are applied - more specific check
  const hasFiltersApplied = Object.entries(watchedValues).some(([key, value]) => {
    // Skip the clear_button field itself
    if (key === 'clear_button') return false;
    
    // Check for arrays (like category)
    if (Array.isArray(value)) {
      return value.length > 0 && value.some(v => v !== null && v !== undefined && v !== '');
    }
    
    // Check for objects (like price_range)
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== null && v !== undefined && v !== '');
    }
    
    // Check for primitive values - be more specific about what constitutes "no value"
    if (value === null || value === undefined || value === '') return false;
    
    // For numbers, check if they're 0 (which might be a valid filter value)
    if (typeof value === 'number') return value !== 0;
    
    // For strings, check if they're not empty
    if (typeof value === 'string') return value.trim() !== '';
    
    // For booleans, check if they're true
    if (typeof value === 'boolean') return value === true;
    
    return true; // Any other truthy value
  });

  return (
    <Fields.Button
      name="clear_button"
      value="clear"
      variant={hasFiltersApplied ? "filled" : "outline"}
      color={hasFiltersApplied ? "red" : undefined}
      onClick={() => reset()}
      className={styles.filter_form_btn_icon}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '42px',
        height: '42px',
        padding: '0',
        backgroundColor: hasFiltersApplied ? '#dc2626' : 'white',
        borderColor: hasFiltersApplied ? '#dc2626' : '#e5e7eb',
        color: hasFiltersApplied ? 'white' : '#374151',
      }}
    >
      <IconX size={16} />
    </Fields.Button>
  );
};

export default Form;
