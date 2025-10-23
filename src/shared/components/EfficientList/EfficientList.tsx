import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';

// Hook for efficient list rendering
export const useEfficientList = <T,>(
  items: T[],
  maxVisibleItems: number = 20,
  itemHeight: number = 200
) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: maxVisibleItems });
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end);
  }, [items, visibleRange]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + Math.ceil(containerHeight / itemHeight) + 5, items.length);
    
    setVisibleRange({ start, end });
  }, [itemHeight, items.length]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    containerRef,
    handleScroll,
    visibleRange
  };
};

// Efficient list component that only renders visible items
interface EfficientListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  maxVisibleItems?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const EfficientList = <T,>({
  items,
  renderItem,
  itemHeight = 200,
  maxVisibleItems = 20,
  className,
  style
}: EfficientListProps<T>) => {
  const { visibleItems, totalHeight, offsetY, containerRef, handleScroll, visibleRange } = useEfficientList(
    items,
    maxVisibleItems,
    itemHeight
  );

  if (items.length <= maxVisibleItems) {
    // For small lists, render all items normally without wrapper
    return (
      <>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </>
    );
  }

  // For large lists, use efficient rendering
  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height: '600px',
        overflow: 'auto',
        ...style
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={visibleRange.start + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Hook for reducing re-renders
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  const callbackRef = useRef<T>(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  return useCallback(((...args: any[]) => {
    return callbackRef.current(...args);
  }) as T, []);
};

// Hook for debounced operations
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Component for reducing DOM complexity
export const OptimizedContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxChildren?: number;
}> = ({ children, className, style, maxChildren = 50 }) => {
  const childrenArray = React.Children.toArray(children);
  
  if (childrenArray.length <= maxChildren) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // For large numbers of children, use efficient rendering
  return (
    <EfficientList
      items={childrenArray}
      renderItem={(child, index) => child}
      itemHeight={100}
      maxVisibleItems={maxChildren}
      className={className}
      style={style}
    />
  );
};

export default EfficientList;