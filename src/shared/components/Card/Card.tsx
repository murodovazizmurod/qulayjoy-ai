import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as Types from './internal/types';
import houseImg from '@/assets/images/house.webp';

// icons
import { IconHeart, IconShare, IconMapPin, IconTrain } from '@tabler/icons-react';
import { TablerIcon } from '../Icon/TablerIcon';

// styles
import styles from './Card.module.scss';

// components
import Button from '../Button';
import { Image } from '@mantine/core';
import { useFavorite, useFavoriteList, useRemoveFavorite } from '@/modules/settings/user/profile/hooks';
import { useAuth } from '@/modules/auth/hooks';
import error from '../Message/internal/hooks/error';
import { useTranslation } from 'react-i18next';

const Card: React.FC<Types.IBase.IProps> = React.memo(({ values, layout, buttonClick, onClick }) => {
  const { items } = useFavoriteList();
  const { isAuthenticated } = useAuth();
  const { mutate: addFavorite } = useFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();
  const { t } = useTranslation('home');
  
  const isVertical = useMemo(() => layout === 'vertical', [layout]);
  const coverImage = useMemo(() => {
    // First try to find cover image
    let cover = values.images?.find(image => image.is_cover);
    // If no cover image, use the first available image
    if (!cover && values.images?.length > 0) {
      cover = values.images[0];
    }
    return cover;
  }, [values.images]);

  // local holat
  const [isFavorite, setIsFavorite] = useState(false);

  // items yoki values.id o‘zgarsa doim sinxronlashtir
  useEffect(() => {
    const exists = items?.results?.some(item => item?.id === values?.id);

    setIsFavorite(!!exists && isAuthenticated);
  }, [items, values?.id, isAuthenticated]);

  // toggle qilish
  const toggleFavorite = useCallback(() => {
    if (!values?.id) return;

    if (!isAuthenticated) {
      error({ message: 'You must be logged in to add a favorite' });
      return;
    }

    // for instant icon feedback
    setIsFavorite(!isFavorite);

    if (isFavorite) {
      const favItem = items?.results?.find(item => item?.id === values?.id);
      if (favItem?.id) removeFavorite({ apartment: favItem.id });
    } else {
      addFavorite({ apartment: values.id });
    }
  }, [isFavorite, values?.id, items, addFavorite, removeFavorite, isAuthenticated]);

  return (
    <div className={`${styles.card} ${isVertical ? styles.vertical : styles.horizontal}`}>
      {/* Image Section */}
      <div className={`${styles.imageSection} ${isVertical ? styles.imageVertical : styles.imageHorizontal}`}>
        {/* Tags Overlay */}
        {values.categories.length > 0 && (
          <div className={styles.tagsOverlay}>
            {values.categories.map((categories, index) => (
              <span key={index} className={`${styles.tag} ${styles[categories.slug]}`}>
                {categories.name}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.actionButton} role="button" aria-label="share">
            <IconShare size={16} />
          </button>
          <button className={styles.actionButton} role="button" aria-label="favorite" onClick={toggleFavorite}>
            <IconHeart
              size={16}
              className={`${styles.favorited} ${isFavorite ? styles.active : ''}`}
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        <Image
          src={coverImage?.image || houseImg}
          fallbackSrc={houseImg}
          alt={`${values.title} image not found`}
          className={styles.image}
          loading="lazy"
          decoding="async"
          onClick={onClick}
          style={{
            objectFit: 'cover',
            transition: 'transform 0.2s ease',
          }}
          onError={(e) => {
            // If image fails to load, use fallback
            const target = e.target as HTMLImageElement;
            if (target.src !== houseImg) {
              target.src = houseImg;
            }
          }}
        />
      </div>

      {/* Content Section */}
      <div className={styles.content} onClick={onClick}>
        <div className={styles.contentTop}>
          <span className={styles.title}>{values.title}</span>

          {/* Price */}
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{`${values.price.toLocaleString()} ${values.currency}`}</span>
            <span className={styles.pricePeriod}>/ {t('month')}</span>
          </div>

          {/* Location & Subway */}
          <div className={styles.locationWrapper}>
            {values.address && (
              <div className={styles.location}>
                <IconMapPin size={16} className={styles.iconLocation} />
                <span>{values.address}</span>
              </div>
            )}

            {values.nearest_metro && (
              <div className={styles.subway}>
                <IconTrain size={16} className={styles.iconSubway} />
                <span>{values.nearest_metro_info}</span>
              </div>
            )}
          </div>

          {/* Amenities */}
          {values.amenities && values.amenities.length > 0 && (
            <div className={styles.amenities}>
              {values.amenities.slice(0, 6).map((amenity, index) => {
                return (
                  <div key={index} className={styles.amenityItem}>
                    <TablerIcon name={amenity.icon || 'ti ti-building'} size={14} className={styles.amenityIcon} />
                    <span>{amenity.name}</span>
                  </div>
                );
              })}
              {values.amenities.length > 6 && (
                <div className={styles.amenityMore}>
                  +{values.amenities.length - 6} {t('more')}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.buttonWrapper}>
          <Button variant="primary-outline" full onClick={buttonClick}>
            {t('view_details')}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Card;
