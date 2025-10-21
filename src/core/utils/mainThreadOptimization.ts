import React, { useRef, useEffect, useState, useCallback } from 'react';

// Performance utilities for reducing main thread work
export class MainThreadOptimizer {
  private static instance: MainThreadOptimizer;
  private taskQueue: (() => void)[] = [];
  private isProcessing = false;

  static getInstance(): MainThreadOptimizer {
    if (!MainThreadOptimizer.instance) {
      MainThreadOptimizer.instance = new MainThreadOptimizer();
    }
    return MainThreadOptimizer.instance;
  }

  // Schedule tasks to run when main thread is idle
  scheduleTask(task: () => void, priority: 'high' | 'low' = 'low'): void {
    if (priority === 'high') {
      // High priority tasks run immediately
      task();
      return;
    }

    this.taskQueue.push(task);
    this.processQueue();
  }

  private processQueue(): void {
    if (this.isProcessing || this.taskQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    const processNext = () => {
      if (this.taskQueue.length === 0) {
        this.isProcessing = false;
        return;
      }

      const task = this.taskQueue.shift();
      if (task) {
        task();
      }

      // Use requestIdleCallback if available, otherwise setTimeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(processNext, { timeout: 100 });
      } else {
        setTimeout(processNext, 0);
      }
    };

    processNext();
  }

  // Batch DOM updates
  batchDOMUpdates(updates: (() => void)[]): void {
    this.scheduleTask(() => {
      // Use DocumentFragment for efficient DOM updates
      const fragment = document.createDocumentFragment();
      
      updates.forEach(update => {
        try {
          update();
        } catch (error) {
          console.error('DOM update error:', error);
        }
      });
    });
  }

  // Defer heavy computations
  deferComputation<T>(computation: () => T): Promise<T> {
    return new Promise((resolve) => {
      this.scheduleTask(() => {
        try {
          const result = computation();
          resolve(result);
        } catch (error) {
          console.error('Computation error:', error);
          resolve(null as T);
        }
      });
    });
  }
}

// React hook for main thread optimization
export const useMainThreadOptimization = () => {
  const optimizer = MainThreadOptimizer.getInstance();

  const scheduleTask = useCallback((task: () => void, priority: 'high' | 'low' = 'low') => {
    optimizer.scheduleTask(task, priority);
  }, [optimizer]);

  const batchUpdates = useCallback((updates: (() => void)[]) => {
    optimizer.batchDOMUpdates(updates);
  }, [optimizer]);

  const deferComputation = useCallback(<T>(computation: () => T): Promise<T> => {
    return optimizer.deferComputation(computation);
  }, [optimizer]);

  return {
    scheduleTask,
    batchUpdates,
    deferComputation
  };
};

// Hook for reducing JavaScript execution time
export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  options: {
    debounce?: number;
    throttle?: number;
    memoize?: boolean;
  } = {}
): T => {
  const { debounce = 0, throttle = 0, memoize = false } = options;
  
  const callbackRef = useRef<T>(callback);
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  const optimizedCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    // Throttle
    if (throttle > 0 && now - lastCallRef.current < throttle) {
      return;
    }

    // Debounce
    if (debounce > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        lastCallRef.current = Date.now();
      }, debounce);
      
      return;
    }

    // Immediate execution
    callbackRef.current(...args);
    lastCallRef.current = now;
  }, [debounce, throttle]);

  return optimizedCallback as T;
};

// Hook for efficient state updates
export const useOptimizedState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const { scheduleTask } = useMainThreadOptimization();

  const setOptimizedState = useCallback((newState: T | ((prev: T) => T)) => {
    scheduleTask(() => {
      setState(newState);
    }, 'low');
  }, [scheduleTask]);

  return [state, setOptimizedState] as const;
};

// Component for reducing DOM complexity
export const OptimizedDiv: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = React.memo(({ children, className, style, onClick, onMouseEnter, onMouseLeave }) => {
  const { scheduleTask } = useMainThreadOptimization();

  const handleClick = useOptimizedCallback(
    () => onClick?.(),
    [onClick],
    { debounce: 100 }
  );

  const handleMouseEnter = useOptimizedCallback(
    () => onMouseEnter?.(),
    [onMouseEnter],
    { throttle: 200 }
  );

  const handleMouseLeave = useOptimizedCallback(
    () => onMouseLeave?.(),
    [onMouseLeave],
    { throttle: 200 }
  );

  return React.createElement('div', {
    className,
    style,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, children);
});

export default MainThreadOptimizer;