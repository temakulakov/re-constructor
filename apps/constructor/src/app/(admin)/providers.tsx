'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // @ts-ignore err: unknown -> err: AxiosError
      retry: (failureCount, err: AxiosError) => {
        if (err.response?.status === 401) {
          return false; // do not retry, trigger error
        }

        // otherwise, restore default
        const defaultRetry = new QueryClient().getDefaultOptions().queries
          ?.retry;

        return typeof defaultRetry === 'number'
          ? failureCount < defaultRetry
          : false;
      },
      // @ts-ignore err: unknown -> err: AxiosError
      onError: (err: AxiosError) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = '/login'; // loginRoute.to;
        }
      },
    },
  },
});

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
