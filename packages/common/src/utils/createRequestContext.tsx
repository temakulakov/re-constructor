import { useMemo, useContext, createContext, PropsWithChildren } from 'react';

type RequestContextProps = {
  createRequest: (<T>(query: string) => Promise<T>) | undefined;
};

const RequestContext = createContext<RequestContextProps>({
  createRequest: undefined,
});

export const useRequestContext = () => useContext(RequestContext);

export const RequestContextProvider = ({
  children,
  createRequest,
}: PropsWithChildren<RequestContextProps>) => {
  const contextValue = useMemo(() => ({ createRequest }), [createRequest]);

  return (
    <RequestContext.Provider value={contextValue}>
      {children}
    </RequestContext.Provider>
  );
};
