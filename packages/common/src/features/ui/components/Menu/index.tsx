import { ReactNode } from 'react';
import { Menu as BaseMenu, MenuProps as BaseMenuProps } from '@mantine/core';

import { Coords, PositionProps } from '../../types/common';
import classes from './Menu.module.css';

type MenuProps = {
  onCloseMenu: () => void;
  opened: boolean;
  coordinates?: Coords;
  children: ReactNode;
  maxHeight?: string;
  width?: string;
  target?: JSX.Element;
  position?: PositionProps;
  offset?: number;
  withinPortal?: boolean;
} & BaseMenuProps;

export const Menu = ({
  children,
  opened,
  coordinates,
  onCloseMenu,
  maxHeight = '400px',
  withinPortal = false,
  target,
  ...props
}: MenuProps) => {
  return (
    <BaseMenu
      opened={opened}
      closeOnItemClick
      onClose={onCloseMenu}
      withinPortal={withinPortal}
      zIndex={100}
      classNames={{ item: classes.item }}
      {...props}
    >
      <BaseMenu.Target>
        {target || (
          <div
            style={{
              position: 'fixed',
              top: `${coordinates ? `${coordinates.x}px` : 'auto'}`,
              left: `${coordinates ? `${coordinates.y}px` : 'auto'}`,
            }}
          />
        )}
      </BaseMenu.Target>
      <BaseMenu.Dropdown>
        <div className={classes.content} style={{ maxHeight }}>
          {children}
        </div>
      </BaseMenu.Dropdown>
    </BaseMenu>
  );
};

Menu.Label = BaseMenu.Label;
Menu.Item = BaseMenu.Item;
Menu.Divider = BaseMenu.Divider;
