import React, { useEffect, useState } from 'react';
import cx from 'clsx';

import classes from './Icon.module.scss';

type HugeIcons = any;
type CustomIcons = any;

export interface IProps {
  variant?: 'custom' | 'outline' | 'solid' | 'bulk';
  name: HugeIcons | CustomIcons;
  size?: number;
  className?: string;
  onClick?: (e: any) => void;
}

const Icon: React.FC<IProps> = ({ variant = 'outline', onClick, className, size = 24, name }) => {
  const [importedComponent, setImportedComponent] = useState<any>(null);

  useEffect(() => {
    if (!variant || !name) return;
    const importComponent = async () => {
      const module = await import(`./list/${variant}/${name}.tsx`);
      const Component = module.default;
      setImportedComponent(<Component />);
    };

    importComponent();
  }, []);

  return (
    <div
      className={cx(classes.wrapper, className)}
      onClick={e => onClick && onClick(e)}
      style={
        size
          ? ({
              '--size': `${size}px`
            } as React.CSSProperties)
          : undefined
      }
    >
      {importedComponent}
    </div>
  );
};

export default Icon;
