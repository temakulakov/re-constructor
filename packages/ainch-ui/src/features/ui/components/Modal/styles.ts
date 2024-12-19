import styled from 'styled-components';
import { media } from '~theme/breakpoints';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { ModalProps } from './types';

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color);
  z-index: 10;
`;

export const Wrapper = styled.div<Pick<ModalProps, 'className'>>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  max-height: 90%;
  background-color: var(--accent-color);
  padding: var(--padding);

  ${media.down('sm')} {
    width: 100%;
    height: 100%;
    border-radius: 0;
    max-height: 100%;
  }
`;

export const CloseButton = styled(Button).attrs({
  size: 'sm',
})`
  position: absolute;
  cursor: pointer;
  top: 16px;
  right: 16px;
  background-color: transparent;

  ${media.down('sm')} {
    position: fixed;
    right: 8px;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 100%;
    height: 1px;
    background-color: var(--text-color);
  }

  &::before {
    rotate: 45deg;
  }

  &::after {
    rotate: -45deg;
  }
`;

export const Title = styled(Typography)`
  margin: 20px 40px 20px;
  text-align: left;

  ${media.down('sm')} {
    margin: 20px 16px 0;
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 40px;
  margin: 24px 0;

  ${media.down('sm')} {
    padding: 0 16px;
    margin: 16px 0;
  }
`;
