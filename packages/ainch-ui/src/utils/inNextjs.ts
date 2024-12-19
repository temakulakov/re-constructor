export const inNextjs = () =>
  typeof window !== 'undefined' && Reflect.has(window, 'next');
