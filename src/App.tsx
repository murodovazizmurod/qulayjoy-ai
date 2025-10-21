import React, { Suspense, useMemo, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as AuthModule from '@/modules/auth';
import { YMaps } from 'react-yandex-maps';

import getRoutesData from './router';

import Splash from '@/shared/components/Splash';
import PerformanceMonitor from '@/core/utils/performance';
import { MainThreadOptimizer } from '@/core/utils/mainThreadOptimization';
// import { usePerformanceOptimization } from '@/core/utils/performanceOptimization';

import { ModalsProvider } from '@mantine/modals';

const App: React.FC = () => {
  const apiKey = import.meta.env.VITE_YMAPS_API_KEY;
  const monitor = PerformanceMonitor.getInstance();
  const mainThreadOptimizer = MainThreadOptimizer.getInstance();
  
  // Initialize performance optimization - temporarily disabled
  // usePerformanceOptimization();

  useEffect(() => {
    // Initialize performance monitoring
    monitor.startTiming('app-initialization');
    
    // Analyze bundle size after app loads
    const timer = setTimeout(() => {
      monitor.endTiming('app-initialization');
      monitor.analyzeBundleSize();
    }, 1000);

    return () => clearTimeout(timer);
  }, [monitor]);

  return (
    <AuthModule.Context.Provider>
      <Suspense fallback={<Splash />}>
        <ModalsProvider>
          <YMaps query={{ apikey: apiKey, lang: 'ru_RU' }}>
            <ApplicationRouter />
          </YMaps>
        </ModalsProvider>
      </Suspense>
    </AuthModule.Context.Provider>
  );
};

const ApplicationRouter = () => {
  const routes = getRoutesData();

  const router = useMemo(() => {
    return createBrowserRouter(routes);
  }, [routes]);

  return <RouterProvider router={router} />;
};

export default App;
