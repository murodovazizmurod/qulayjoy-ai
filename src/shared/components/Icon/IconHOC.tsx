import React, { lazy, Suspense } from 'react';

import { type IProps } from '@/shared/components/Icon/Icon.tsx';

const Icon = lazy(() => import('./index.ts'));

const IconHOC: React.FC<IProps> = ({ variant, onClick, className, size, name }) => {
  return (
    <Suspense fallback={<div />}>
      <Icon variant={variant} onClick={onClick} className={className} size={size} name={name} />
    </Suspense>
  );
};

export default IconHOC;
