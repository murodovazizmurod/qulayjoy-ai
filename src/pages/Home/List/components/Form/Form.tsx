import * as Components from '@mantine/core';
import * as Fields from '@/shared/containers/fields';

import Subway from './Subway';
import Regions from './Regions';
import Amenities from './Amenities';
import Categories from './Categories';

// styles
import styles from '../../List.module.scss';
import { useViewportSize } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import {
  IconDoorExit,
  IconElevator,
  IconFlame,
  IconMapPin,
  IconParkingCircle,
  IconTable,
  IconTemperature,
  IconWindow,
  IconZzz
} from '@tabler/icons-react';

const Form = () => {
  const { width } = useViewportSize();
  const { t } = useTranslation();

  return (
    <div className={styles.filterbar_items_wrapper}>
      <Categories />

      <Components.Group gap={12}></Components.Group>

      <Components.SimpleGrid cols={width > 768 ? 4 : 2}>
        {/* address */}
        <Fields.Text
          name="address"
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconMapPin size={16} /> {t('address', { ns: 'filter' })}
            </div>
          }
          placeholder={t('address', { ns: 'filter' })}
        />

        <Amenities />

        <Fields.Text
          name="windows_view"
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconWindow size={16} />
              {t('look_from_window', { ns: 'filter' })}
            </div>
          }
          placeholder={t('look_from_window', { ns: 'filter' })}
          asArray
        />
        <Fields.Select
          name="elevators"
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconElevator size={16} /> {t('elevator_count', { ns: 'filter' })}
            </div>
          }
          placeholder={t('elevator_count', { ns: 'filter' })}
          data={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3+', value: '3plus' }
          ]}
        />
      </Components.SimpleGrid>

      <Components.SimpleGrid cols={width > 768 ? 4 : 2}>
        {/* balcony */}
        <Fields.Select
          name="balcony"
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconDoorExit size={16} /> {t('balcony_type', { ns: 'filter' })}
            </div>
          }
          placeholder={t('balcony_type', { ns: 'filter' })}
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
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconZzz size={16} /> {t('bedroom_type', { ns: 'filter' })}
            </div>
          }
          placeholder={t('bedroom_type', { ns: 'filter' })}
          data={[
            { label: t(`bedroom.combined`, { ns: 'amenities' }), value: 'combined' },
            { label: t(`bedroom.multi`, { ns: 'amenities' }), value: 'multi' },
            { label: t(`bedroom.separate`, { ns: 'amenities' }), value: 'separate' }
          ]}
        />
        <Regions w="100%" />
        <Subway w="100%" />
      </Components.SimpleGrid>

      <Components.SimpleGrid cols={width > 768 ? 4 : 2}>
        <Fields.Select
          name="gas"
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconFlame size={16} /> {t('gas_type', { ns: 'filter' })}
            </div>
          }
          placeholder={t('gas_type', { ns: 'filter' })}
          data={[
            { label: t(`gas.main`, { ns: 'amenities' }), value: 'main' },
            { label: t(`gas.reservoir`, { ns: 'amenities' }), value: 'reservoir' },
            { label: t(`gas.none`, { ns: 'amenities' }), value: 'none' }
          ]}
        />

        <Fields.Select
          name="heating"
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconTemperature size={16} /> {t('heating', { ns: 'filter' })}
            </div>
          }
          placeholder={t('heating', { ns: 'filter' })}
          data={[
            { label: t(`heating.autonomous`, { ns: 'amenities' }), value: 'autonomous' },
            { label: t(`heating.central`, { ns: 'amenities' }), value: 'central' },
            { label: t(`heating.none`, { ns: 'amenities' }), value: 'none' }
          ]}
        />

        <Fields.Select
          name="parking"
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconParkingCircle size={16} /> {t('parking', { ns: 'filter' })}
            </div>
          }
          placeholder={t('parking', { ns: 'filter' })}
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
          label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <IconTable size={16} /> {t('rooms_count', { ns: 'filter' })}
            </div>
          }
          placeholder={t('rooms_count', { ns: 'filter' })}
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
