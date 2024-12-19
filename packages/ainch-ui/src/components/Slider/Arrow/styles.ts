import styled, { css } from 'styled-components';
import { ArrowVariants } from './types';
import arrow from '../assets/arrow.svg';

export const Container = styled.div`
  position: absolute;
  height: 20px;
  width: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  ::before {
    display: none;
  }

  &.slick-prev {
    left: -20px;
  }

  &.slick-next {
    right: -20px;
  }
`;

export const Icon = styled.button<{ arrowType?: ArrowVariants }>`
  height: 100%;
  width: 100%;
  border: none;
  background: url(${arrow}) no-repeat center;
  cursor: inherit;

  ${({ arrowType }) => {
    if (arrowType === 'next') {
      return css`
        transform: scaleX(-1);
      `;
    }

    return false;
  }}
`;
