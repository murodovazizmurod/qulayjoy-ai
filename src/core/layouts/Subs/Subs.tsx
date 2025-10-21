import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Auth.module.scss';

const Subs: React.FC = () => {
  return (
    <div className={styles.content}>
      <Outlet />
    </div>
  );
};

export default Subs;
