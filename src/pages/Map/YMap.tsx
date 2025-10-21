import { useRef } from 'react';
import { useViewportSize } from '@mantine/hooks';
import { Map, Placemark, Clusterer } from 'react-yandex-maps';
import useApartmentsListMap from '@/modules/apartmentSearch/hooks/useApartmentsListMap';
import Modal from '@/pages/Home/List/components/CardModal/Modal';
import * as ModuleHooks from '@/modules/apartmentSearch/hooks';
import { useSearchParams } from 'react-router-dom';
import type { IEntity } from '@/modules/apartmentSearch/types';

export const YandexMap = () => {
  const { width, height } = useViewportSize();
  const mapRef = useRef<any>(null);
  const placemarkRefs = useRef<{ [key: string]: any }>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const apartmentId = searchParams.get('apartmentId');

  const { apartments } = useApartmentsListMap();

  const { apartment: selectedCard, isLoading } = ModuleHooks.useApartment({
    id: Number(apartmentId),
    enabled: !!apartmentId
  });

  const handleCardClick = (item: IEntity.ApartmentsFeature) => {
    setSearchParams({ apartmentId: String(item.id) });
  };

  const handleCloseModal = () => {
    setSearchParams({});
  };

  return (
    <>
      <Map
        instanceRef={ref => (mapRef.current = ref)}
        defaultState={{ center: [41.3111, 69.2797], zoom: 12 }}
        width="100%"
        height={width > 992 ? height : height / 3}
      >
        <Clusterer
          options={{
            preset: 'islands#circleIcon',
            iconColor: 'rgb(71, 162, 250)'
          }}
        >
          {apartments?.map(p => (
            <Placemark
              key={p.id}
              geometry={[p.geometry.coordinates[1], p.geometry.coordinates[0]]}
              instanceRef={(ref: any) => (placemarkRefs.current[p.id] = ref)}
              options={{
                preset: 'islands#circleIcon',
                iconColor: 'rgb(71, 162, 250)'
              }}
              onClick={() => handleCardClick(p)}
            />
          ))}
        </Clusterer>
      </Map>

      {apartmentId && (
        <Modal opened={!!apartmentId} selectedCard={selectedCard} isLoading={isLoading} onClose={handleCloseModal} authModals={undefined} />
      )}
    </>
  );
};
