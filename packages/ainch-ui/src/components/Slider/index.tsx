import React, { memo, useEffect, useRef } from 'react';
import SlickSlider, { Settings } from 'react-slick';
import debounce from 'lodash/debounce';
import { Arrow } from './Arrow';
import { Wrapper } from './styles';

const defaultSettings = {
  dots: false,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: false,
  centerPadding: '20px',
  nextArrow: <Arrow arrowType="next" />,
  prevArrow: <Arrow arrowType="previous" />,
};

interface SliderProps extends Settings {
  className?: string;
  gap?: string;
  visibleOtherSlides?: boolean;
  currentIndex?: number;
  children: React.ReactNode;
  instanceRef: React.MutableRefObject<SlickSlider | null>;
}

const _Slider: React.FC<SliderProps> = ({
  className = '',
  children,
  gap = '',
  visibleOtherSlides = false,
  currentIndex = 0,
  instanceRef,
  ...props
}) => {
  const sliderRef = useRef<SlickSlider | null>(null);
  const ref = instanceRef || sliderRef;
  const settings = { ...defaultSettings, ...props };

  useEffect(() => {
    const slick = ref.current;

    const swipe = debounce(() => {
      if (slick && slick.slickGoTo) {
        slick?.slickGoTo(currentIndex, true);
      }
    }, 400);

    if (slick) {
      swipe();
    }

    return () => swipe.cancel();
  }, [currentIndex, ref]);

  return (
    <Wrapper
      className={className}
      visibleOtherSlides={visibleOtherSlides}
      gap={gap}
    >
      <SlickSlider ref={ref} {...settings}>
        {children}
      </SlickSlider>
    </Wrapper>
  );
};

export const Slider = memo(_Slider);
