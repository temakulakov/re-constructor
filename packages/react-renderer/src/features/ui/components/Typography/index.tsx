import { forwardRef } from 'react';
import { Text } from '@mantine/core';

import { TypographyProps, Variants } from './types';

const elementByVariant = {
  [Variants.h1]: 'h1',
  [Variants.h2]: 'h2',
  [Variants.h3]: 'h3',
  [Variants.h4]: 'h4',
  [Variants.h5]: 'h5',
  [Variants.p1]: 'p',
  [Variants.p2]: 'p',
  [Variants.body]: 'p',
  [Variants.link]: 'a',
  [Variants.caption]: 'span',
} as const;

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, children, color, inline, variant }, ref) => {
    const as = elementByVariant[variant ?? 'p1'];

    return (
      <Text
        ref={ref}
        className={className}
        c={color}
        inline={inline}
        component={as}
      >
        {children}
      </Text>
    );
  }
);

Typography.displayName = 'Typography';
