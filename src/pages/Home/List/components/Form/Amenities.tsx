import * as Fields from '@/shared/containers/fields';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';
import { useTranslation } from 'react-i18next';
import { IconPlus } from '@tabler/icons-react';

const Amenities = () => {
  const { t } = useTranslation('filter');
  const { amenities } = ModuleHooks.useAmenities();

  return (
    <Fields.MultiSelect
      name="amenities"
      label={
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          <IconPlus size={16} /> {t('amenities')}
        </div>
      }
      placeholder={t('amenities')}
      data={amenities?.result?.map(a => ({
        value: String(a.id),
        label: a.name
      }))}
      searchable
    />
  );
};

export default Amenities;
