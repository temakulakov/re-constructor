import styled from 'styled-components';
import { media } from '~theme/breakpoints';

export const Background = styled.div<{ color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ color }) => color || 'transparent'};
  z-index: 20;
`;

export const Image = styled.img`
  height: auto;
  max-width: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  z-index: 21;

  ${Image} {
    max-height: 600px;

    ${media.down('lg')} {
      max-height: 400px;
    }

    ${media.down('sm')} {
      max-height: 50vh;
    }
  }
`;

export const Container = styled.div`
  position: relative;
`;
