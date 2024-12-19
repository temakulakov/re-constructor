import { css } from 'styled-components';

export const lineCss = css`
  display: block;
  content: '';
  position: absolute;
  background-color: rgba(86, 86, 86, 0.15);
  z-index: 10;
`;

const gridLineCss = css`
  &::before,
  &::after {
    ${lineCss}
  }
`;

export const horizontalLines = css`
  ${gridLineCss}

  & ~ &::before {
    display: none;
  }

  &::before,
  &::after {
    left: 0;
    width: 100%;
    height: 1px;
  }

  &::after {
    bottom: -1;
  }

  &::before {
    top: 0;
  }
`;

export const verticalLines = css`
  ${gridLineCss}

  &::before,
  &::after {
    top: 0;
    width: 1px;
    height: 100%;
  }

  &::after {
    right: var(--padding);
  }

  &::before {
    left: var(--padding);
  }
`;
