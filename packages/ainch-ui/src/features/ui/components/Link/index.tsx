import { forwardRef } from 'react';
import cx from 'clsx';

import {
  Link as DefaultLink,
  LinkProps as DefaultLinkProps,
} from '~features/routing';
import { Variants } from './types';
import classes from './Link.module.css';

export type LinkProps = {
  variant?: Variants;
  fluid?: boolean;
  linkComponent?: React.ElementType;
} & DefaultLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      linkComponent: LinkElement = DefaultLink,
      children,
      variant = 'inherit',
      fluid = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <LinkElement
        className={cx(
          classes.link,
          classes[`link_${variant}`],
          fluid && classes.link_fluid,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </LinkElement>
    );
  }
);
