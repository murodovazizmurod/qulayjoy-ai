import React from 'react';

// Performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private preloadedImages: Set<string> = new Set();
  private lazyLoadObserver: IntersectionObserver | null = null;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Preload critical images
  preloadImage(src: string, priority: 'high' | 'low' = 'high'): Promise<void> {
    if (this.preloadedImages.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }

      link.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Setup lazy loading for images
  setupLazyLoading(): void {
    if (this.lazyLoadObserver) {
      return;
    }

    this.lazyLoadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              img.classList.add('loaded');
            }
            
            this.lazyLoadObserver?.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      this.lazyLoadObserver?.observe(img);
    });
  }

  // Optimize images with proper attributes
  optimizeImage(img: HTMLImageElement, src: string, alt: string = '', priority: 'high' | 'low' = 'low'): void {
    img.loading = priority === 'high' ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.fetchPriority = priority;
    
    if (priority === 'low') {
      img.dataset.src = src;
      img.classList.add('lazy');
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';
    } else {
      img.src = src;
    }
    
    img.alt = alt;
    
    if (priority === 'low') {
      this.lazyLoadObserver?.observe(img);
    }
  }

  // Preload critical resources
  preloadCriticalResources(): void {
    // Preload critical fonts
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    criticalFonts.forEach((font) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = font;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });
  }

  // Optimize third-party scripts
  optimizeThirdPartyScripts(): void {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach((script) => {
      if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
        script.setAttribute('defer', '');
      }
    });
  }

  // Reduce layout shifts
  preventLayoutShifts(): void {
    // Add aspect ratio to images
    const images = document.querySelectorAll('img:not([style*="aspect-ratio"])');
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;
      if (imgElement.naturalWidth && imgElement.naturalHeight) {
        const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
        imgElement.style.aspectRatio = `${aspectRatio}`;
      }
    });
  }

  // Cleanup
  cleanup(): void {
    if (this.lazyLoadObserver) {
      this.lazyLoadObserver.disconnect();
      this.lazyLoadObserver = null;
    }
  }
}

// React hook for performance optimization
export const usePerformanceOptimization = () => {
  const optimizer = PerformanceOptimizer.getInstance();

  React.useEffect(() => {
    // Setup lazy loading
    optimizer.setupLazyLoading();
    
    // Preload critical resources
    optimizer.preloadCriticalResources();
    
    // Optimize third-party scripts
    optimizer.optimizeThirdPartyScripts();
    
    // Prevent layout shifts
    optimizer.preventLayoutShifts();

    return () => {
      optimizer.cleanup();
    };
  }, []);

  return {
    preloadImage: optimizer.preloadImage.bind(optimizer),
    optimizeImage: optimizer.optimizeImage.bind(optimizer)
  };
};

// Image component with built-in optimization
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  priority?: 'high' | 'low';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ src, alt, priority = 'low', className, style, onClick }) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { optimizeImage } = usePerformanceOptimization();

  React.useEffect(() => {
    if (imgRef.current) {
      optimizeImage(imgRef.current, src, alt, priority);
    }
  }, [src, alt, priority, optimizeImage]);

  return React.createElement('img', {
    ref: imgRef,
    alt: alt,
    className: className,
    style: style,
    onClick: onClick
  });
};

export default PerformanceOptimizer;
