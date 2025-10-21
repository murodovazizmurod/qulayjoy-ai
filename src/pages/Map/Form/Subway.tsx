import * as Fields from '@/shared/containers/fields';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';
import { useTranslation } from 'react-i18next';

const Subway = () => {
  const { subways } = ModuleHooks.useSubway();
  const { t } = useTranslation('filter');

  return (
    <Fields.Select
      name="nearest_metro"
      label={t('metro_station')}
      placeholder={t('metro_station')}
      data={subways?.results?.features.map(a => ({
        value: String(a?.id),
        label: a?.properties.name
      }))}
    />
  );
};

export default Subway;
