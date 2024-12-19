import { useMemo, useState } from 'react';

import { useScrollLock } from './useScrollLock';

export const useDisclosure = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  const memoizedResult = useMemo(() => {
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((currentIsOpen) => !currentIsOpen);
    return { open, close, toggle };
  }, []);

  useScrollLock(isOpen);

  return { ...memoizedResult, isOpen };
};
