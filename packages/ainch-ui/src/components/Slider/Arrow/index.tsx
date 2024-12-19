import React from 'react';
import { Container, Icon } from './styles';
import { ArrowVariants } from './types';

export const Arrow = ({
  arrowType,
  ...otherProps
}: {
  arrowType?: ArrowVariants;
}) => (
  <Container {...otherProps}>
    <Icon arrowType={arrowType} />
  </Container>
);
