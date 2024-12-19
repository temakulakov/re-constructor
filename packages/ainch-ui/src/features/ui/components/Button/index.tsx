import { forwardRef } from 'react';
import cx from 'clsx';

import { Link } from '../Link';
import { variants, sizes } from './constants';
import classes from './Button.module.css';

type ButtonProps = {
  children?: React.ReactNode | string;
  className?: string;
  disabled?: boolean;
  fluid?: boolean;
  icon?: React.ReactNode;
  linkComponent?: React.ElementType;
  onClick?: () => void;
  variant?: `${variants}`;
  size?: `${sizes}`;
  as?: React.ElementType;
} & Omit<React.ComponentProps<typeof Link>, 'variant'> &
  React.ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled = false,
      icon = null,
      size = sizes.lg,
      linkComponent: LinkComponent = Link,
      onClick,
      route,
      hash,
      params,
      variant = variants.PRIMARY,
      fluid,
      as = 'button',
      className,
      ...props
    },
    ref
  ) => {
    const isLink = (route || hash) && !disabled;
    const ButtonElement = isLink ? LinkComponent : as;

    return (
      <ButtonElement
        className={cx(
          classes.button,
          classes[`button_${size}`],
          classes[`button_${variant}`],
          fluid && classes.button_fluid,
          icon && classes.button_icon,
          className
        )}
        disabled={disabled}
        as={as}
        {...{
          ...props,
          ...(isLink && { as: LinkComponent, route, hash, params }),
          ...(!disabled && { onClick }),
        }}
        ref={ref}
      >
        {icon}
        {children && <div className={classes.content}>{children}</div>}
      </ButtonElement>
    );
  }
);

Button.displayName = 'Button';
