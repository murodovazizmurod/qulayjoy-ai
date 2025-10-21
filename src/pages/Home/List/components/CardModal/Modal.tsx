import * as Hooks from '@mantine/hooks';
import * as Components from '@mantine/core';
import * as Types from '@/modules/apartmentSearch/types';
import { useEffect, useState } from 'react';

import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import { IconHeart, IconShare, IconX } from '@tabler/icons-react';
import success from '@/shared/components/Message/internal/hooks/success';
import error from '@/shared/components/Message/internal/hooks/error';

// styles
import styles from '../../List.module.scss';

interface UseAuthModalsReturn {
  loginOpened: boolean;
  registerOpened: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeLogin: () => void;
  closeRegister: () => void;
  closeAll: () => void;
}

interface IProps {
  opened: boolean;
  selectedCard?: Types.IEntity.Apartment;
  isLoading?: boolean;
  onClose: () => void;
  authModals?: UseAuthModalsReturn;
}

const Modal = ({ opened, selectedCard, isLoading, onClose, authModals }: IProps) => {
  const { width } = Hooks.useViewportSize();
  const [imageViewerOpen, setImageViewerOpen] = useState(false);

  // Custom ESC key handling for apartment modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && opened && !imageViewerOpen) {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    if (opened) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened, imageViewerOpen, onClose]);

  const handleShare = async () => {
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
  };

  return (
    <Components.Modal.Root
      centered
      opened={opened}
      onClose={onClose}
      className={styles.modal}
      closeOnClickOutside={false}
      closeOnEscape={false}
      size={width > 992 ? '90%' : '100%'}
    >
      <Components.Modal.Overlay />
      <Components.Modal.Content>
        {isLoading ? (
          <>
            <Components.Modal.Header className={styles.modal_header}>
              <Components.Modal.Title className={styles.title}>{selectedCard?.title}</Components.Modal.Title>

              <div className={styles.modal_header_group}>
                <div className={styles.modal_header_icon_wrapper} onClick={handleShare}>
                  <IconShare className={styles.modal_header_icon_wrapper_icon} />
                </div>
                <div className={styles.modal_header_icon_wrapper}>
                  <IconHeart className={styles.modal_header_icon_wrapper_icon} fill={'none'} />
                </div>

                <div className={styles.modal_header_icon_wrapper} onClick={onClose}>
                  <IconX className={styles.modal_header_icon_wrapper_icon} />
                </div>
              </div>
            </Components.Modal.Header>

            <Components.Modal.Body>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <Components.Loader size="xl" />
              </div>
            </Components.Modal.Body>
          </>
        ) : (
          <>
            {selectedCard && (
              <>
                <ModalHeader selectedCard={selectedCard} onClose={onClose} />
                <ModalBody 
                  selectedCard={selectedCard} 
                  authModals={authModals}
                  {...({ onImageViewerStateChange: setImageViewerOpen } as any)}
                />
              </>
            )}
          </>
        )}
      </Components.Modal.Content>
    </Components.Modal.Root>
  );
};

export default Modal;
