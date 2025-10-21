import * as Components from '@mantine/core';
import * as Fields from '@/shared/containers/fields';

import Subway from './Subway';
import Amenities from './Amenities';
import Categories from './Categories';

// styles
// import cx from 'clsx';
import styles from '../Map.module.scss';
import Regions from '@/pages/Home/List/components/Form/Regions';
import { useTranslation } from 'react-i18next';

const Form = () => {
  const { t } = useTranslation('filter');

  return (
    <div className={styles.filterbar_items_wrapper}>
      <Categories />

      <Components.SimpleGrid className={styles.fiedls_wrapper}>
        {/* address */}
        <Fields.Text name="address" label={t('address')} placeholder={t('address')} />

        <Amenities />

        <Fields.Text name="windows_view" label={t('look_from_window')} placeholder={t('look_from_window')} asArray />

        <Regions />
      </Components.SimpleGrid>

      <Components.SimpleGrid className={styles.fiedls_wrapper}>
        <Subway />

        {/* balcony */}
        <Fields.Select
          name="balcony"
          label={t('balcony_type')}
          placeholder={t('balcony_type')}
          data={[
            { label: t(`balcony.balcony`, { ns: 'amenities' }), value: 'balcony' },
            { label: t(`balcony.loggia`, { ns: 'amenities' }), value: 'loggia' },
            { label: t(`balcony.terrace`, { ns: 'amenities' }), value: 'terrace' },
            { label: t(`balcony.none`, { ns: 'amenities' }), value: 'none' }
          ]}
        />

        {/* bathroom */}
        <Fields.Select
          name="bathroom"
          label={t('bedroom_type')}
          placeholder={t('bedroom_type')}
          data={[
            { label: t(`bedroom.combined`, { ns: 'amenities' }), value: 'combined' },
            { label: t(`bedroom.multi`, { ns: 'amenities' }), value: 'multi' },
            { label: t(`bedroom.separate`, { ns: 'amenities' }), value: 'separate' }
          ]}
        />

        <Fields.Select
          name="elevators"
          label={t('elevator_count')}
          placeholder={t('elevator_count')}
          data={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3+', value: '3plus' }
          ]}
        />
      </Components.SimpleGrid>

      <Components.SimpleGrid className={styles.fiedls_wrapper}>
        <Fields.Select
          name="gas"
          label={t('gas_type')}
          placeholder={t('gas_type')}
          data={[
            { label: t(`gas.main`, { ns: 'amenities' }), value: 'main' },
            { label: t(`gas.reservoir`, { ns: 'amenities' }), value: 'reservoir' },
            { label: t(`gas.none`, { ns: 'amenities' }), value: 'none' }
          ]}
        />

        <Fields.Select
          name="heating"
          label={t('heating')}
          placeholder={t('heating')}
          data={[
            { label: t(`heating.autonomous`, { ns: 'amenities' }), value: 'autonomous' },
            { label: t(`heating.central`, { ns: 'amenities' }), value: 'central' },
            { label: t(`heating.none`, { ns: 'amenities' }), value: 'none' }
          ]}
        />

        <Fields.Select
          name="parking"
          label={t('parking')}
          placeholder={t('parking')}
          data={[
            { label: t(`parking.closed`, { ns: 'amenities' }), value: 'closed' },
            { label: t(`parking.garage`, { ns: 'amenities' }), value: 'garage' },
            { label: t(`parking.open`, { ns: 'amenities' }), value: 'open' },
            { label: t(`parking.underground`, { ns: 'amenities' }), value: 'underground' },
            { label: t(`parking.none`, { ns: 'amenities' }), value: 'none' }
          ]}
        />

        <Fields.Select
          name="rooms"
          label={t('rooms_count')}
          placeholder={t('rooms_count')}
          data={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: t(`rooms.studio`, { ns: 'amenities' }), value: 'studio' }
          ]}
        />
      </Components.SimpleGrid>
    </div>
  );
};

export default Form;
