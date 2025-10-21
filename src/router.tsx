import { type RouteObject } from 'react-router-dom';
import queryString from 'query-string';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import ContentLanguageProvider from '@/core/context/contentLanguage/Provider';
import { ErrorBoundary } from 'react-error-boundary';
import { lazy, Suspense } from 'react';
const MainLayout = lazy(() => import('@/core/layouts/Main/Main'));

const getRoutesData = (): RouteObject[] => [
  {
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <QueryParamProvider
          adapter={ReactRouter6Adapter}
          options={{
            searchStringToObject: queryString.parse,
            objectToSearchString: queryString.stringify
          }}
        >
          <ContentLanguageProvider>
            <MainLayout />
          </ContentLanguageProvider>
        </QueryParamProvider>
      </Suspense>
    ),
    errorElement: <ErrorBoundary fallback={<div>Something went wrong</div>} />,
    children: [
      {
        path: '/',
        async lazy() {
          const { Home } = await import('@/pages/Home/Home');

          return { Component: Home };
        }
      },
      {
        path: '/profile',
        async lazy() {
          const { Profile } = await import('@/pages/Profile/Profile');

          return { Component: Profile };
        }
      },
      {
        path: '/map',
        async lazy() {
          const { Map } = await import('@/pages/Map/Map');

          return { Component: Map };
        }
      },
      {
        path: '/subscribe',
        async lazy() {
          const { Subscribe } = await import('@/pages/Subs/Subscribe');

          return { Component: Subscribe };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { PlanDetail } = await import('@/pages/Subs/PlanDetail/PlanDetail');

              return { Component: PlanDetail };
            }
          }
        ]
      }
    ]
  }
];

export default getRoutesData;
