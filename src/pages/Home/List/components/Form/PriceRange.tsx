import * as Fields from '@/shared/containers/fields';
import { IconCircleArrowDownRight, IconCircleArrowUpRight } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

export default function PriceRange() {
  const { t } = useTranslation('filter');
  return (
    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
      <Fields.NumberInput
        name="price_min"
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <IconCircleArrowUpRight size={16} /> {t('price_min')}
          </div>
        }
        placeholder={t('price_min')}
        w="50%"
        thousandSeparator=","
        radius={8}
      />
      <Fields.NumberInput
        name="price_max"
        label={
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <IconCircleArrowDownRight size={16} /> {t('price_max')}
          </div>
        }
        placeholder={t('price_max')}
        w="50%"
        thousandSeparator=","
        radius={8}
      />
    </div>
  );
}
