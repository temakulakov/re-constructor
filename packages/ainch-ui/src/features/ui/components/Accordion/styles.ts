import styled, { css } from 'styled-components';
import { media } from '~theme/breakpoints';
import { Typography, typographyStyles } from '../Typography';
import { textStyles } from '../../constants';
import Arrow from '../../assets/arrow-vertical.svg';

const ARROW_SIZE = 40;

export const Wrapper = styled.div`
  position: relative;
  transform: translateZ(0);
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h3',
}))<{ isOpen: boolean }>`
  appearance: none;
  border: none;
  background-color: transparent;
  width: 100%;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: ${ARROW_SIZE}px;
    height: ${ARROW_SIZE}px;
    transition: opacity 0.3s;
    background: url(${Arrow}) no-repeat center / cover;
    rotate: 180deg;

    ${media.down('lg')} {
      width: ${ARROW_SIZE * 0.7}px;
      height: ${ARROW_SIZE * 0.7}px;
    }

    ${({ isOpen }) =>
      isOpen &&
      css`
        rotate: 0deg;
      `};
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

export const Text = styled.div<{
  isShown: boolean;
}>`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding-top 0.3s ease;
  will-change: max-height;
  ${textStyles}
  ${typographyStyles.p2}

  ${({ isShown }) =>
    isShown &&
    css`
      padding-top: 1rem;
      max-height: max-content;
      overflow: visible;
    `}
`;
