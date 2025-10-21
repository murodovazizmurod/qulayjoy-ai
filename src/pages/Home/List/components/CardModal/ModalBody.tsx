import { useRef, useState } from 'react';

import * as Components from '@mantine/core';
import * as Types from '@/modules/apartmentSearch/types';

import Spacer from '@/shared/components/Spacer';
import houseImg from '@/assets/images/house.webp';
import { TablerIcon } from '@/shared/components/Icon/TablerIcon';
import ImageViewer from './ImageViewer';

// styles
import cx from 'clsx';
import styles from '../../List.module.scss';
import { useAuth } from '@/modules/auth/hooks';
import error from '@/shared/components/Message/internal/hooks/error';
import { useNavigate } from 'react-router-dom';
import { Circle, Map, Placemark } from 'react-yandex-maps';
import useProfile from '@/modules/settings/user/profile/hooks/useProfile';
import { hideString } from '@/core/utils';
import { useTranslation } from 'react-i18next';
import {
  IconBuildingSkyscraper,
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
  IconMeterSquare,
  IconPaint,
  IconPhone,
  IconTableColumn,
  IconTrain,
  IconUser
} from '@tabler/icons-react';

interface ModalBodyProps {
  selectedCard: Types.IEntity.Apartment;
  authModals?: any;
  onImageViewerStateChange?: (isOpen: boolean) => void; // Callback to notify parent about image viewer state
}

const ModalBody = ({ 
  selectedCard, 
  authModals, 
  onImageViewerStateChange 
}: ModalBodyProps) => {
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);
  const { isAuthenticated } = useAuth();
  const { user } = useProfile();
  const { t } = useTranslation('apartment');
  const [activeImage, setActiveImage] = useState<number>(0);
  const [shouldShowPhone, setShouldShowPhone] = useState(false);
  const [imageViewerOpened, setImageViewerOpened] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

  const showNextImage = () => {
    setActiveImage(prev => {
      if (prev < selectedCard.images.length - 1) {
        return prev + 1;
      }
      return 0;
    });
  };

  const showPrevImage = () => {
    setActiveImage(prev => {
      if (prev > 0) {
        return prev - 1;
      }
      return selectedCard.images.length - 1;
    });
  };
  const togglePhone = () => {
    if (!isAuthenticated) {
      error({ message: 'You must be logged in to view the phone number' });
      authModals?.openLogin();
      return;
    }
    if (!user?.active_subscription) {
      error({ message: 'You must have an active subscription to view the phone number' });
      return;
    }
    setShouldShowPhone(!shouldShowPhone);
  };

  const openImageViewer = (index: number) => {
    setImageViewerIndex(index);
    setImageViewerOpened(true);
    onImageViewerStateChange?.(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpened(false);
    onImageViewerStateChange?.(false);
  };

  const details = {
    balcony: selectedCard.balcony.display,
    bathroom: selectedCard.bathroom.display,
    built_year: selectedCard.building_year,
    building_type: selectedCard.building_type.display,
    ceiling_height: selectedCard.ceiling_height_m,
    walls: selectedCard.walls.display,
    elevators: selectedCard.elevators,
    parking: selectedCard.parking.display,
    gas: selectedCard.gas.display,
    heating: selectedCard.heating.display
  };

  return (
    <Components.Modal.Body className={styles.modal_body}>
      <div className={styles.content_wrapper}>
        <div className={styles.left_column_wrapper}>
          <div className={styles.image_section}>
            <div className={styles.slide} style={{ background: `url(${selectedCard.images[activeImage].image})` }}>
              {selectedCard.images.length > 1 && (
                <div className={cx(styles.slide_action, styles.left_action)} onClick={showPrevImage}>
                  <IconChevronLeft className={styles.action_icon} />
                </div>
              )}
              <Components.Group className={styles.tags}>
                {selectedCard.categories.map(tag => (
                  <Components.Badge key={tag.id} className={`${styles.tag} ${styles[tag.slug]}`}>
                    {tag.name}
                  </Components.Badge>
                ))}
              </Components.Group>
              <Components.Image
                className={styles.slide_main_img}
                src={selectedCard.images[activeImage].image}
                fallbackSrc={houseImg}
                alt="Image not found"
                onClick={() => openImageViewer(activeImage)}
                style={{ cursor: 'pointer' }}
              />
              {selectedCard.images.length > 1 && (
                <div className={cx(styles.slide_action, styles.right_action)} onClick={showNextImage}>
                  <IconChevronRight className={styles.action_icon} />
                </div>
              )}
            </div>
            <Spacer size="md" />
            <div className={styles.image_section_images_list}>
              {selectedCard.images.map((item, index) => (
                <Components.Image
                  key={item.id}
                  src={item.image}
                  fallbackSrc={houseImg}
                  alt="Image not found"
                  onClick={() => {
                    setActiveImage(index);
                    openImageViewer(index);
                  }}
                  className={cx(styles.image_section_images_list_item, index === activeImage && styles.active_thumb)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
          <div className={styles.map_container}>
            <div className={styles.map_header}>
              <IconMapPin className={styles.map_icon} />
              <div className={styles.map_title}>{t('location_on_map')}</div>
            </div>
            
            <div className={styles.map_box}>
              <Map
                instanceRef={ref => (mapRef.current = ref)}
                defaultState={{ 
                  center: [...selectedCard.location.coordinates].reverse(), 
                  zoom: 15
                }}
                width="100%"
                height="100%"
              >
                {user?.active_subscription ? (
                  <Placemark 
                    geometry={[...selectedCard.location.coordinates].reverse()}
                    options={{
                      preset: 'islands#blueHomeIcon',
                      iconColor: '#3b82f6'
                    }}
                    properties={{
                      balloonContent: `
                        <div style="padding: 8px; font-family: system-ui;">
                          <strong>${selectedCard.title}</strong><br/>
                          <span style="color: #6b7280; font-size: 12px;">${selectedCard.address}</span>
                        </div>
                      `
                    }}
                  />
                ) : (
                  <Circle 
                    geometry={[[...selectedCard.location.coordinates].reverse(), 500]}
                    options={{
                      fillColor: '#3b82f6',
                      fillOpacity: 0.2,
                      strokeColor: '#3b82f6',
                      strokeOpacity: 0.6,
                      strokeWidth: 2
                    }}
                  />
                )}
              </Map>
            </div>
            
            <div className={styles.map_footer}>
              <div className={styles.map_info}>
                <IconMapPin size={12} />
                {user?.active_subscription ? 'Exact location' : 'Approximate area'}
              </div>
              <button 
                className={styles.map_action}
                onClick={() => {
                  const coords = [...selectedCard.location.coordinates].reverse();
                  const url = `https://yandex.com/maps/?pt=${coords[0]},${coords[1]}&z=15&l=map`;
                  window.open(url, '_blank');
                }}
              >
                Open in Maps
              </button>
            </div>
          </div>
        </div>

        <div className={styles.infos_section}>
          <div className={styles.content}>
            {/* Price */}
            <div className={styles.priceWrapper}>
              <span className={styles.price}>{`${selectedCard.price.toLocaleString()} ${selectedCard.currency}`}</span>
              <span className={styles.pricePeriod}>{t('price_period')}</span>
            </div>

            <div className={styles.locationWrapper}>
              {selectedCard.address && (
                <div className={styles.location}>
                  <IconMapPin size={16} className={styles.iconLocation} />
                  <span>{selectedCard.address}</span>
                </div>
              )}

              {selectedCard.nearest_metro && (
                <div className={styles.subway}>
                  <IconTrain size={16} className={styles.iconSubway} />
                  <span>{selectedCard.nearest_metro_info}</span>
                </div>
              )}
            </div>
          </div>

          <Spacer size="sm" />
          <Components.Group gap={32}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconTableColumn size={32} />
              <div>
                <Components.Text size="xs" c="dimmed">
                  {t('rooms')}
                </Components.Text>
                <Components.Text>{selectedCard.rooms}</Components.Text>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconMeterSquare size={36} />
              <div>
                <Components.Text size="xs" c="dimmed">
                  {t('area')}
                </Components.Text>
                <Components.Text>
                  {selectedCard.total_area_m2} m<sup>2</sup>
                </Components.Text>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconBuildingSkyscraper size={32} />
              <div>
                <Components.Text size="xs" c="dimmed">
                  {t('floor')}
                </Components.Text>
                <Components.Text>
                  {selectedCard.floor ? `${selectedCard.floor} / ${selectedCard.floors_total}` : 'N/A'}
                </Components.Text>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconPaint size={32} />
              <div>
                <Components.Text size="xs" c="dimmed">
                  {t('finishing')}
                </Components.Text>
                <Components.Text>{selectedCard.finishing.display}</Components.Text>
              </div>
            </div>
          </Components.Group>
          <Spacer size="sm" />
          <div className={styles.modal_body_description}>
            <Components.Text className={styles.modal_body_desc_title}>{t('description')}</Components.Text>
            <Components.Text className={styles.modal_body_desc}>{selectedCard.description}</Components.Text>
          </div>

          <div className={styles.modal_body_amenities}>
            <Components.Text className={styles.modal_body_desc_title}>{t('amenities')}</Components.Text>
            {selectedCard.amenities.length > 0 && (
              <div className={styles.amenities}>
                {selectedCard.amenities.slice(0, 6).map((amenity, index) => {
                  return (
                    <div key={index} className={styles.amenityItem}>
                      <TablerIcon name={amenity.icon || 'ti ti-building'} size={14} className={styles.amenityIcon} />
                      <span>{amenity.name}</span>
                    </div>
                  );
                })}
                {selectedCard.amenities.length > 6 && (
                  <div className={styles.amenityMore}>+{selectedCard.amenities.length - 6} more</div>
                )}
              </div>
            )}
          </div>
          <Spacer size="sm" />

          <Components.Accordion>
            <Components.Accordion.Item value="details">
              <Components.Accordion.Control>{t('additional_info')}</Components.Accordion.Control>
              <Components.Accordion.Panel>
                <Components.Table>
                  <Components.Table.Tbody>
                    {Object.entries(details).map(([key, value]) => (
                      <Components.Table.Tr key={key}>
                        <Components.Table.Td>{t(key)}</Components.Table.Td>
                        <Components.Table.Td align="right">{value}</Components.Table.Td>
                      </Components.Table.Tr>
                    ))}
                  </Components.Table.Tbody>
                </Components.Table>
              </Components.Accordion.Panel>
            </Components.Accordion.Item>
          </Components.Accordion>
          <Components.Group 
            className={cx(
              styles.owner,
              {
                [styles.has_subscription]: isAuthenticated && user?.active_subscription,
                [styles.phone_revealed]: shouldShowPhone && isAuthenticated && user?.active_subscription
              }
            )} 
            onClick={togglePhone}
          >
            <Components.Text className={styles.owner_label}>{t('contact')}</Components.Text>
            <Components.Group gap={14} align="center">
              <div className={styles.owner_icon_wrapper}>
                <IconUser />
              </div>
              <div className={styles.owner_data}>
                <Components.Text>{t('owner')}</Components.Text>
                <div className={styles.owner_data_phone_wrapper}>
                  <IconPhone className={styles.owner_data_phone_wrapper_icon} />
                  <Components.Text className={styles.owner_data_phone_wrapper_label}>
                    {shouldShowPhone ? selectedCard.contact_phone : hideString({ value: selectedCard.contact_phone })}
                  </Components.Text>
                </div>
              </div>
            </Components.Group>
          </Components.Group>
        </div>
      </div>
      
      {/* Image Viewer */}
      <ImageViewer
        images={selectedCard.images}
        initialIndex={imageViewerIndex}
        opened={imageViewerOpened}
        onClose={closeImageViewer}
      />
    </Components.Modal.Body>
  );
};

export default ModalBody;
