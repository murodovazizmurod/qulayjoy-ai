import React from 'react';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }

  endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      console.warn(`No start time found for label: ${label}`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(label);
    return fn().finally(() => {
      this.endTiming(label);
    });
  }

  measureSync<T>(label: string, fn: () => T): T {
    this.startTiming(label);
    const result = fn();
    this.endTiming(label);
    return result;
  }

  // Bundle size analysis
  analyzeBundleSize(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      console.group('📊 Bundle Performance Analysis');
      console.log(`⚡ Time to Interactive: ${navigation.domInteractive?.toFixed(2)}ms`);
      console.log(`📦 Total Bundle Size: ${this.getBundleSize()}KB`);
      console.groupEnd();
    }
  }

  private getBundleSize(): number {
    if (typeof window === 'undefined') return 0;
    
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    let totalSize = 0;
    
    // This is a rough estimate - actual size would need to be measured via network tab
    scripts.forEach(() => totalSize += 50); // Rough estimate per script
    styles.forEach(() => totalSize += 10); // Rough estimate per stylesheet
    
    return totalSize;
  }
}

// React component performance wrapper
export const withPerformanceMonitoring = <P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo((props: P) => {
    const monitor = PerformanceMonitor.getInstance();
    
    React.useEffect(() => {
      monitor.startTiming(`${componentName}-render`);
      return () => {
        monitor.endTiming(`${componentName}-render`);
      };
    });

    return React.createElement(Component, props);
  });
};

// Hook for measuring component render times
export const usePerformanceMonitor = (componentName: string) => {
  const monitor = PerformanceMonitor.getInstance();
  
  React.useEffect(() => {
    monitor.startTiming(`${componentName}-mount`);
    return () => {
      monitor.endTiming(`${componentName}-mount`);
    };
  }, [componentName, monitor]);
};

// Hook for measuring API call performance
export const useAPIPerformanceMonitor = () => {
  const monitor = PerformanceMonitor.getInstance();
  
  const measureAPI = React.useCallback(async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    return monitor.measureAsync(`API-${endpoint}`, apiCall);
  }, [monitor]);

  return { measureAPI };
};

export default PerformanceMonitor;
