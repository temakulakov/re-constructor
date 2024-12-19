import { Box as BoxComponent } from '@mantine/core';
import React from 'react';

type BoxProps = React.PropsWithChildren<React.CSSProperties>;

export const Box = ({
  children,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  margin,
  padding,
  background,
  border,
  borderRadius,
  position,
  top,
  left,
  right,
  bottom,
  boxShadow,
  ...props
}: BoxProps) => {
  return (
    <BoxComponent
      style={{
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        margin,
        padding,
        background,
        border,
        borderRadius,
        position,
        top,
        left,
        right,
        bottom,
        boxShadow,
      }}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </BoxComponent>
  );
};
