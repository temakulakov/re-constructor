import { forwardRef } from 'react';
import cx from 'clsx';

import classes from './Container.module.css';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  hasPadding?: boolean;
  hasGridLines?: boolean;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, hasPadding = true, hasGridLines = true }, ref) => (
    <div
      ref={ref}
      className={cx(
        classes.wrapper,
        hasGridLines && classes['grid-lines'],
        hasPadding && classes.wrapper_padded,
        className
      )}
    >
      {children}
    </div>
  )
);
