import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
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

        return Number.isSafeInteger(defaultRetry)
          ? failureCount < (defaultRetry ?? 0)
          : false;
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.error('Auth error');
        }
      },
    },
  },
});
