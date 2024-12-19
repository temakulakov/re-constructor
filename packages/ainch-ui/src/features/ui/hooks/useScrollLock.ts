import { useEffect, useRef } from 'react';

let scrollLocksCount = 0;

export const useScrollLock = (enabled: boolean) => {
  const scrollY = useRef<number>();

  useEffect(() => {
    if (enabled) {
      scrollLocksCount += 1;

      if (scrollLocksCount === 1) {
        scrollY.current = window.scrollY;

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY.current}px`;
        document.body.style.width = '100%';

        // ios 15 scrolling fix
        document.documentElement.style.height = '100dvh';
      }
    } else {
      scrollY.current && window.scrollTo(0, scrollY.current);
    }

    return () => {
      if (enabled) {
        scrollLocksCount -= 1;

        if (scrollLocksCount < 1) {
          document.body.style.overflow = 'visible';
          document.body.style.position = 'static';
          document.body.style.top = 'auto';
          document.body.style.width = 'auto';

          document.documentElement.style.height = '100%';
        }
      }
    };
  }, [enabled]);
};
