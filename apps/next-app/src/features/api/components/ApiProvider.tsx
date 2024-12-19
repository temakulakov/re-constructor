import { memo } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../utils/client';

type ApiProviderProps = {
  children: React.ReactNode;
};

export const ApiProvider = memo(({ children }: ApiProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
});
