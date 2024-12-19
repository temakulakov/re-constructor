import styled, { css } from 'styled-components';
import {
  Typography,
  typographyStyles,
} from '~features/ui/components/Typography';
import { Link } from '~features/routing';
import { lineCss } from '~features/ui/components/GridLine';
import { media } from '~theme/breakpoints';
import { textStyles } from '~features/ui/constants';
import { getTitleHoverStyles } from '../styles';

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${media.down('lg')} {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled(Typography).attrs(() => ({ variant: 'caption' }))`
  text-transform: uppercase;
`;

export const WorkFlowBlock = styled.div`
  padding-top: calc(var(--padding) * 2);

  ${Label} {
    padding: 0 var(--padding);
  }

  ${media.down('lg')} {
    padding: var(--padding) 0;
  }
`;

export const DirectionBlock = styled.div`
  position: relative;
  padding: calc(var(--padding) * 2) var(--padding);

  &::before {
    ${lineCss}
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
  }

  ${Label} {
    margin-bottom: var(--padding);
  }

  ${media.down('lg')} {
    padding: var(--padding);

    &::before {
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
    }
  }
`;

export const Title = styled(Typography).attrs(() => ({ variant: 'h3' }))`
  display: inline-block;
  margin-bottom: 0.5em;
  padding-left: 0.1em;
  padding-right: 0.5em;
`;

export const Counter = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

export const Item = styled.li.attrs(({ route }: { route: string | null }) => {
  return { ...(route && { as: Link }) };
})<{ route?: string | null; $hasGap?: boolean }>`
  position: relative;
  display: block;

  ${({ route }) =>
    route &&
    css`
      color: inherit;
      text-decoration: none;

      ${getTitleHoverStyles(Title)}
    `}
`;

export const WorkFlowList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  ${Item} {
    padding: var(--padding);
  }

  ${Item} + ${Item}::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    ${lineCss}
  }

  ${media.down('lg')} {
    ${Item} + ${Item}::before {
      content: none;
    }

    ${Item}:last-child {
      padding-bottom: 0;
    }
  }
`;

export const DirectionList = styled.ul`
  list-style: none;
  padding-left: 1.5rem;
  margin: 0;

  ${Counter} {
    position: absolute;
    left: -1.5rem;
    top: -0.6rem;
  }

  ${media.down('lg')} {
    padding-left: 0;

    ${Counter} {
      display: none;
    }

    ${Item}:last-child ${Title} {
      margin-bottom: 0;
    }
  }
`;

export const Text = styled.div`
  ${textStyles}
  ${typographyStyles.p2}
`;
