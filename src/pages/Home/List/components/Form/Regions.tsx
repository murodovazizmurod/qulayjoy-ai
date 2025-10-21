import * as Fields from '@/shared/containers/fields';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';
import { IconMap } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const Regions = ({ ...props }) => {
  const { regions } = ModuleHooks.useRegions();
  const { t } = useTranslation('filter');

  return (
    <Fields.Select
      w="50%"
      name="region"
      label={
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          <IconMap size={16} /> {t('district')}
        </div>
      }
      placeholder={t('district')}
      data={regions?.results?.map(a => ({
        value: String(a.id),
        label: a.name
      }))}
      searchable
      {...props}
    />
  );
};

export default Regions;
