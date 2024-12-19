'use client';

import { useState, forwardRef } from 'react';
import { Allotment } from 'allotment';
import { ActionIcon, Title } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import cx from 'clsx';

import { FullscreenExitIcon, FullscreenEnterIcon } from '@finch-cloud/common';
import classes from './Pane.module.css';

type PaneProps = {
  title?: React.ReactNode;
  toggles?: React.ReactNode;
  toolbar?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Allotment.Pane>;

export const Pane = forwardRef<HTMLDivElement, PaneProps>(
  ({ children, title, toolbar, toggles, ...paneProps }, ref) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
      setIsFullscreen((prevIsFullscreen) => !prevIsFullscreen);
    };

    useHotkeys([
      [
        'Escape',
        () => {
          if (isFullscreen) {
            toggleFullscreen();
          }
        },
      ],
    ]);

    return (
      <Allotment.Pane ref={ref} {...paneProps}>
        <div
          className={cx(classes.wrapper, isFullscreen && classes.fullscreen)}
        >
          <div className={classes.toolbar}>
            <Title px={12} order={3} size={14}>
              {title}
            </Title>
            <div className={classes.toggles}>{toggles}</div>
            <div className={classes.buttons}>
              {toolbar}
              <ActionIcon
                onClick={toggleFullscreen}
                title="Fullscreen (Esc to exit)"
              >
                {isFullscreen ? (
                  <FullscreenExitIcon />
                ) : (
                  <FullscreenEnterIcon />
                )}
              </ActionIcon>
            </div>
          </div>
          {children}
        </div>
      </Allotment.Pane>
    );
  }
);

// Small hack to allow 'allotment' lib recognize child type as Pane
Pane.displayName = 'Allotment.Pane';
