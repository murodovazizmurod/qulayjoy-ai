import React, { type ReactNode } from 'react';

// import Splash from '@/shared/components/Splash';

import { useContext } from '../context';
// import { useProfile } from '../hooks';

interface IProps {
  children: ReactNode;
}

const Subs: React.FC<IProps> = ({ children }) => {
  // useProfile();

  const { state } = useContext();

  if (!state.isFetched) {
    // return <Splash />;
  }

  return children;
};

export default Subs;
