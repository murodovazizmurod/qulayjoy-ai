import * as Fields from '@/shared/containers/fields';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';
import { useTranslation } from 'react-i18next';
import { IconTrain } from '@tabler/icons-react';

const Subway = ({ ...props }) => {
  const { subways } = ModuleHooks.useSubway();
  const { t } = useTranslation('filter');

  return (
    <Fields.Select
      w="50%"
      name="nearest_metro"
      label={
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          <IconTrain size={16} /> {t('metro_station')}
        </div>
      }
      placeholder={t('metro_station')}
      data={subways?.results?.features.map(a => ({
        value: String(a?.id),
        label: a?.properties.name
      }))}
      searchable
      {...props}
    />
  );
};

export default Subway;
