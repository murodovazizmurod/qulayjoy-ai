import './bootstrap';

import '@mantine/core/styles.css';
import './assets/styles/main.scss';
import '@mantine/notifications/styles.css';
import { createRoot } from 'react-dom/client';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getApiError } from '@/core/utils';

import { message } from '@/shared/components/Message';

import AppProviders from '@/core/providers/AppProviders.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

// Register service worker for performance optimization
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const showApiError = (error: any) => {
  const data = getApiError(error);

  if (data.validations.length > 0) {
    data.validations.forEach((item: string) => {
      console.error(item);
    });
    return;
  }

  data.message && message.error(data.message);
};

const onQueryError = (error: any, query: any) => {
  if (query.options.meta?.customErrorHandling) return;

  showApiError(error);
};

const onMutationError = (error: any, _variables: any, _context: any, mutation: any) => {
  const { t } = useTranslation();
  if (mutation.options.meta?.customErrorHandling) return;

  // both 'ECONNABORTED' and 'ERR_NETWORK' can be due to network issue or disconnecting from server
  if (['ECONNABORTED', 'ERR_NETWORK'].includes(error?.code)) {
    // if user is not onlinew
    if (!navigator.onLine) {
      message.error(t('no_connection_user', { ns: 'messages' }));
      return;
    }

    if (error.statis)
      // If user is online, then the issue is with connecting to server
      message.error(t('no_connection_server', { ns: 'messages' }));
    return;
  }

  showApiError(error);
};

// @ts-ignore
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  },

  mutationCache: new MutationCache({
    onError: onMutationError
  }),
  queryCache: new QueryCache({
    onError: onQueryError
  })
});

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<div>{t('something_went_wrong', { ns: 'messages' })}</div>}>
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <App />
      </AppProviders>
    </QueryClientProvider>
  </ErrorBoundary>
);
