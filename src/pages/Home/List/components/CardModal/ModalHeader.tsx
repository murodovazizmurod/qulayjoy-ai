import * as Components from '@mantine/core';
import * as Types from '@/modules/apartmentSearch/types';

// styles
import styles from '../../List.module.scss';
import { useFavorite, useFavoriteList, useRemoveFavorite } from '@/modules/settings/user/profile/hooks';
import React from 'react';
import { useAuth } from '@/modules/auth/hooks';
import error from '@/shared/components/Message/internal/hooks/error';
import success from '@/shared/components/Message/internal/hooks/success';
import { IconShare, IconHeart, IconX } from '@tabler/icons-react';

interface IProps {
  selectedCard: Types.IEntity.Apartment;
  onClose: () => void;
}

const ModalHeader = ({ selectedCard, onClose }: IProps) => {
  const { mutate: addFavorite } = useFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();
  const { items } = useFavoriteList();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    const exists = items?.results?.some(item => item?.id === selectedCard?.id);
    setIsFavorite(!!exists);
  }, [items, selectedCard?.id]);

  const toggleFavorite = React.useCallback(() => {
    if (!selectedCard?.id) return;

    if (!isAuthenticated) {
      error({ message: 'You must be logged in to add a favorite' });
      return;
    }

    // for instant icon feedback
    setIsFavorite(!isFavorite);

    if (isFavorite) {
      const favItem = items?.results?.find(item => item?.id === selectedCard?.id);
      if (favItem?.id) removeFavorite({ apartment: favItem.id });
    } else {
      addFavorite({ apartment: selectedCard.id });
    }
  }, [isFavorite, selectedCard?.id, items, addFavorite, removeFavorite]);

  const handleShare = React.useCallback(async () => {
    if (!selectedCard) return;

    const shareData = {
      title: selectedCard.title,
      text: `${selectedCard.title} - ${selectedCard.address}`,
      url: window.location.href
    };

    // Check if Web Share API is supported (mobile devices)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        success({ message: 'Apartment shared successfully!' });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          error({ message: 'Failed to share apartment' });
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        const shareText = `${selectedCard.title}\n${selectedCard.address}\n${window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        success({ message: 'Apartment link copied to clipboard!' });
      } catch (err) {
        error({ message: 'Failed to copy to clipboard' });
      }
    }
  }, [selectedCard]);

  return (
    <Components.Modal.Header className={styles.modal_header}>
      <Components.Modal.Title className={styles.title}>{selectedCard?.title}</Components.Modal.Title>

      <div className={styles.modal_header_group}>
        <div className={styles.modal_header_icon_wrapper} onClick={handleShare}>
          <IconShare className={styles.modal_header_icon_wrapper_icon} />
        </div>
        <div className={styles.modal_header_icon_wrapper} onClick={toggleFavorite}>
          <IconHeart className={styles.modal_header_icon_wrapper_icon} fill={isFavorite ? 'currentColor' : 'none'} />
        </div>

        <div className={styles.modal_header_icon_wrapper} onClick={onClose}>
          <IconX className={styles.modal_header_icon_wrapper_icon} />
        </div>
      </div>
    </Components.Modal.Header>
  );
};

export default ModalHeader;
