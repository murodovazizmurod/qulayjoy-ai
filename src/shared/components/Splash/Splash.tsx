import React, { useEffect } from 'react';

import classes from './Splash.module.scss';

import * as Components from '@mantine/core';

const Splash: React.FC = () => {
  useEffect(() => {
    if ('activeElement' in document) {
      (document.activeElement as HTMLElement).blur();
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.loading}>
        <div className={classes.loadingSpinner}>
          <Components.Loader size={42} color="rgba(108, 191, 255, 1)" />
        </div>
      </div>
    </div>
  );
};

export default Splash;
