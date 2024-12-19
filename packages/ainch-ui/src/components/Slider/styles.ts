import styled, { css } from 'styled-components';

type GapProps = {
  gap: string;
};

type SlidesProps = {
  visibleOtherSlides: boolean;
};

const getGap = ({ gap }: GapProps) =>
  gap &&
  css`
    .slick-slider {
      margin: 0 calc(${gap} / -2);
    }
    .slick-slide {
      box-sizing: border-box;
      padding: 0 calc(${gap} / 2);
    }
  `;

const getVisibilityOfSlides = ({ visibleOtherSlides }: SlidesProps) =>
  visibleOtherSlides &&
  css`
    .slick-list {
      overflow: visible;
    }

    .slick-slider {
      overflow: visible;
    }
  `;

export const Wrapper = styled('div')<GapProps & SlidesProps>`
  ${getGap};
  ${getVisibilityOfSlides};

  .slick-slider {
    position: relative;
  }
`;
