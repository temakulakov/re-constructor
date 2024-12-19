import { forwardRef } from 'react';
import cx from 'clsx';

import { Variants } from './types';
import classes from './Typography.module.css';

export const elementByVariant: { [key in Variants]: React.ElementType } = {
  [Variants.h1]: 'h1',
  [Variants.h2]: 'h2',
  [Variants.h3]: 'h3',
  [Variants.p1]: 'p',
  [Variants.p2]: 'p',
  [Variants.body]: 'p',
  [Variants.link]: 'a',
  [Variants.caption]: 'span',
  [Variants.label]: 'span',
};

const variantsClassNames = {
  default: 'default',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p1: 'p1',
  p2: 'p2',
  link: 'link',
  caption: 'caption',
  label: 'label',
} as const;

type TextProps = {
  className?: string;
  align?: 'left' | 'right' | 'center';
  color?: string;
  inline?: boolean;
  variant: `${Variants}`;
};

export type TypographyProps = TextProps & {
  children: React.ReactNode;
  element?: React.ElementType;
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ variant, children, className, element, align, inline, ...props }, ref) => {
    const TextElement = element || elementByVariant[variant];

    return (
      <TextElement
        ref={ref}
        className={cx(
          classes.text,
          classes[variantsClassNames[variant] ?? variantsClassNames.default],
          align && classes[`text_${align}`],
          inline && classes.text_inline,
          className
        )}
        variant={variant}
        {...props}
      >
        {children}
      </TextElement>
    );
  }
);
