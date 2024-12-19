import React from 'react';

export const enum Variants {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  p1 = 'p1',
  p2 = 'p2',
  body = 'body',
  link = 'link',
  caption = 'caption',
}

export type TextProps = {
  className?: string;
  align?: 'left' | 'right' | 'center';
  color?: string;
  inline?: boolean;
  variant?: `${Variants}`;
};

export type TypographyProps = TextProps & {
  element: React.ElementType;
  children: React.ReactNode;
};
