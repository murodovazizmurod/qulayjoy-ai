import React from 'react';

interface IProps {
  direction?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;
}

const sizeMap: Record<string, string> = {
  xs: '4px',
  sm: '8px',
  md: '20px',
  lg: '30px',
  xl: '44px',
  full: '100%'
};

const Spacer: React.FC<IProps> = ({ size = 'md', direction = 'vertical' }) => {
  let dimension: string;

  if (typeof size === 'number') dimension = `${size}px`;
  else dimension = sizeMap[size] || sizeMap['md'];

  return (
    <div
      style={direction === 'vertical' ? { height: dimension, width: '100%' } : { width: dimension, height: '100%' }}
    />
  );
};

export default Spacer;
