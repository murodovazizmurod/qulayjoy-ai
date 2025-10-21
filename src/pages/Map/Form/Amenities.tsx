import * as Fields from '@/shared/containers/fields';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';
import { useTranslation } from 'react-i18next';

const Amenities = () => {
  const { amenities } = ModuleHooks.useAmenities();
  const { t } = useTranslation('filter');

  return (
    <Fields.MultiSelect
      name="amenities"
      label={t('amenities')}
      placeholder={t('amenities')}
      data={amenities?.result.map(a => ({
        value: String(a.id),
        label: a.name
      }))}
    />
  );
};

export default Amenities;
