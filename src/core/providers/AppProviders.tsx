import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
// import * as AuthModule from '@/modules/auth';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider>
      <Notifications transitionDuration={300} limit={4} />
      {children}
    </MantineProvider>
  );
};

export default AppProviders;
