import React, { useState, useEffect } from 'react';
import * as Components from '@mantine/core';
import { IconX, IconChevronLeft, IconChevronRight, IconZoomIn, IconZoomOut } from '@tabler/icons-react';
import cx from 'clsx';
import styles from './ImageViewer.module.scss';

interface ImageViewerProps {
  images: Array<{ id: number; image: string }>;
  initialIndex: number;
  opened: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, initialIndex, opened, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setImagePosition({ x: 0, y: 0 });
  }, [initialIndex, opened]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!opened) return;
    
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        onClose();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextImage();
        break;
      case '+':
      case '=':
        e.preventDefault();
        zoomIn();
        break;
      case '-':
        e.preventDefault();
        zoomOut();
        break;
      case '0':
        e.preventDefault();
        resetZoom();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [opened, currentIndex, zoom]);

  if (!opened || !images.length) return null;

  return (
    <Components.Modal.Root
      opened={opened}
      onClose={onClose}
      size="100%"
      centered
      className={styles.imageViewerModal}
      zIndex={10000}
    >
      <Components.Modal.Overlay 
        className={styles.imageViewerOverlay}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <Components.Modal.Content 
        className={styles.imageViewerContent}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.imageViewerHeader}>
          <div className={styles.imageViewerTitle}>
            {currentIndex + 1} / {images.length}
          </div>
          <div className={styles.imageViewerActions}>
            <Components.Button
              variant="subtle"
              size="sm"
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className={styles.actionButton}
            >
              <IconZoomOut size={16} />
            </Components.Button>
            <Components.Button
              variant="subtle"
              size="sm"
              onClick={resetZoom}
              className={styles.actionButton}
            >
              {Math.round(zoom * 100)}%
            </Components.Button>
            <Components.Button
              variant="subtle"
              size="sm"
              onClick={zoomIn}
              disabled={zoom >= 3}
              className={styles.actionButton}
            >
              <IconZoomIn size={16} />
            </Components.Button>
            <Components.Button
              variant="subtle"
              size="sm"
              onClick={onClose}
              className={styles.actionButton}
            >
              <IconX size={16} />
            </Components.Button>
          </div>
        </div>

        {/* Image Container */}
        <div className={styles.imageViewerBody}>
          <div
            className={styles.imageContainer}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <img
              src={images[currentIndex].image}
              alt={`Apartment image ${currentIndex + 1}`}
              className={styles.imageViewerImage}
              style={{
                transform: `scale(${zoom}) translate(${imagePosition.x / zoom}px, ${imagePosition.y / zoom}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease',
              }}
              draggable={false}
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                className={cx(styles.navButton, styles.navButtonLeft)}
                onClick={prevImage}
                aria-label="Previous image"
              >
                <IconChevronLeft size={24} />
              </button>
              <button
                className={cx(styles.navButton, styles.navButtonRight)}
                onClick={nextImage}
                aria-label="Next image"
              >
                <IconChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className={styles.thumbnailStrip}>
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.image}
                alt={`Thumbnail ${index + 1}`}
                className={cx(
                  styles.thumbnail,
                  index === currentIndex && styles.activeThumbnail
                )}
                onClick={() => {
                  setCurrentIndex(index);
                  setZoom(1);
                  setImagePosition({ x: 0, y: 0 });
                }}
              />
            ))}
          </div>
        )}
      </Components.Modal.Content>
    </Components.Modal.Root>
  );
};

export default ImageViewer;
