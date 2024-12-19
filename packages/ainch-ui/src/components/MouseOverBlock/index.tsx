import React, { useState, memo, useRef } from 'react';
import throttle from 'lodash/throttle';
import cx from 'clsx';

import { Position } from './types';
import classes from './MouseOverBlock.module.css';

const isBlockEnabled = false;

const LINE_SIZE = 6;

export const MouseOverBlock = memo(({ children }) => {
  const [cursorPosition, setCursorPosition] = useState<Position | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = throttle(
    (e) => {
      if (containerRef.current) {
        const {
          width: containerWidth,
          height: containerHeight,
          x,
          y,
        } = containerRef.current.getBoundingClientRect();

        const { clientX, clientY } = e;

        const offsetX = clientX - x;
        const offsetY = clientY - y;
        const totalOffsetX =
          (offsetX > containerWidth - LINE_SIZE &&
            containerWidth - LINE_SIZE) ||
          (offsetX < 0 && 0) ||
          offsetX ||
          0;
        const totalOffsetY =
          (offsetY > containerHeight - LINE_SIZE &&
            containerHeight - LINE_SIZE) ||
          (offsetY < 0 && 0) ||
          offsetY ||
          0;

        setCursorPosition({ x: totalOffsetX, y: totalOffsetY });
      }
    },
    0
  );

  const handleMouseOut = () => {
    setCursorPosition(null);
  };

  if (!isBlockEnabled) {
    return <div className={classes.wrapper}>{children}</div>;
  }

  return (
    <div
      className={classes.wrapper}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <div className={classes.overlay}>
        {cursorPosition && (
          <>
            <div
              className={cx(classes.line, classes.line_horizontal)}
              style={{ left: `${cursorPosition.x}px` }}
            />
            <div
              className={cx(classes.line, classes.line_vertical)}
              style={{ top: `${cursorPosition.y}px` }}
            />
            <div
              className={cx(classes.line, classes['line_horizontal-inverted'])}
              style={{ right: `${cursorPosition.x}px` }}
            />
            <div
              className={cx(classes.line, classes['line_vertical-inverted'])}
              style={{ bottom: `${cursorPosition.y}px` }}
            />
          </>
        )}
      </div>
      {children}
    </div>
  );
});
