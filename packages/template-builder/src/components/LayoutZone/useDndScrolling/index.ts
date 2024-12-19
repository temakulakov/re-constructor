import React, { useEffect, useContext } from 'react';
import { DndContext } from 'react-dnd';

import { noop } from './utils';
import { ScrollingMonitor } from './ScrollingMonitor';
import { Box, Options, Point } from './types';

const DEFAULT_BUFFER = 450;

export function createHorizontalStrength(_buffer: number) {
  return function defaultHorizontalStrength({ x, w, y, h }: Box, point: Point) {
    const buffer = Math.min(w / 2, _buffer);
    const inRange = point.x >= x && point.x <= x + w;
    const inBox = inRange && point.y >= y && point.y <= y + h;

    if (inBox) {
      if (point.x < x + buffer) {
        return (point.x - x - buffer) / buffer;
      }
      if (point.x > x + w - buffer) {
        return -(x + w - point.x - buffer) / buffer;
      }
    }

    return 0;
  };
}

export function createVerticalStrength(_buffer: number) {
  return function defaultVerticalStrength({ y, h, x, w }: Box, point: Point) {
    const buffer = Math.min(h / 2, _buffer);
    const inRange = point.y >= y && point.y <= y + h;
    const inBox = inRange && point.x >= x && point.x <= x + w;

    if (inBox) {
      if (point.y < y + buffer) {
        return (point.y - y - buffer) / buffer;
      }
      if (point.y > y + h - buffer) {
        return -(y + h - point.y - buffer) / buffer;
      }
    }

    return 0;
  };
}

export const defaultHorizontalStrength =
  createHorizontalStrength(DEFAULT_BUFFER);

export const defaultVerticalStrength = createVerticalStrength(DEFAULT_BUFFER);

const defaultOptions = {
  onScrollChange: noop,
  verticalStrength: defaultVerticalStrength,
  horizontalStrength: defaultHorizontalStrength,
  strengthMultiplier: 30,
};

export function useDndScrolling(
  componentRef: React.RefObject<HTMLElement>,
  passedOptions?: Partial<Options>
) {
  const { dragDropManager } = useContext(DndContext);
  if (!dragDropManager) {
    throw new Error(
      'Unable to get dragDropManager from context. Wrap this in <DndProvider>.'
    );
  }

  useEffect(() => {
    if (!componentRef.current) {
      return () => {};
    }

    const options = { ...passedOptions, ...defaultOptions };
    const monitor = new ScrollingMonitor(
      dragDropManager,
      componentRef.current,
      options
    );

    monitor.start();

    return () => {
      monitor.stop();
    };
  }, [componentRef, dragDropManager, passedOptions]);
}
