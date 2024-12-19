import { useEffect, useRef, useState } from 'react';
import { ActionIcon, Card, Text } from '@mantine/core';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';
import cx from 'clsx';

import { CloseIcon } from '@finch-cloud/common';
import {
  componentConfigs,
  componentNames,
  draggableItems,
} from '../../constants';
import { DndItem } from '../../types';
import { dropPositions } from '../constants';
import { AdjacentDropzone } from './AdjacentDropzone';
import classes from './Item.module.css';

type ItemProps = {
  name: string;
  type: keyof typeof componentNames;
  onItemMove: (dragIndex: number, hoverIndex: number) => void;
  onDeleteClick: (index: number) => void;
  onNewItemDrop: (item: DndItem, index: number) => void;
  onClick: (index: number) => void;
  index: number;
  isSelected: boolean;
};

export const Item = ({
  name,
  index,
  type,
  onItemMove,
  onNewItemDrop,
  onDeleteClick,
  onClick,
  isSelected,
}: ItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeAdjacentSide, setActiveAdjacentSide] = useState<
    keyof typeof dropPositions | null
  >(null);
  const [{ handlerId, isOverCurrent }, drop] = useDrop<
    DndItem,
    void,
    { handlerId: Identifier | null; isOverCurrent: boolean }
  >({
    accept: [draggableItems.CREATABLE_ITEM, draggableItems.DRAGGABLE_ITEM],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      };
    },
    drop(item: DndItem) {
      if (item.type === draggableItems.CREATABLE_ITEM) {
        onNewItemDrop(
          item,
          activeAdjacentSide === dropPositions.top ? index : index + 1
        );
      }
      setActiveAdjacentSide(null);
    },
    hover(item: DndItem, monitor) {
      setActiveAdjacentSide(null);

      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (item.type === draggableItems.CREATABLE_ITEM) {
        if (hoverClientY < hoverMiddleY) {
          setActiveAdjacentSide(dropPositions.top);
        }

        if (hoverClientY > hoverMiddleY) {
          setActiveAdjacentSide(dropPositions.bottom);
        }
      }

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      if (typeof dragIndex === 'number') {
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          setActiveAdjacentSide(dropPositions.bottom);
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          setActiveAdjacentSide(dropPositions.top);
          return;
        }

        if (item.type === draggableItems.CREATABLE_ITEM) {
          return;
        }

        onItemMove(dragIndex, hoverIndex);
      }

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: draggableItems.DRAGGABLE_ITEM,
    item: () => {
      return { name, index, type };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (!isOverCurrent) {
      setActiveAdjacentSide(null);
    }
  }, [isOverCurrent]);

  drag(drop(ref));

  if (!type) {
    return null;
  }

  const config = componentConfigs[type];
  const Icon = config?.icon;

  const handleClick = () => {
    onClick(index);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleteClick(index);
  };

  return (
    <Card
      className={cx(classes.item, isSelected && classes.item_selected)}
      ref={ref}
      data-handler-id={handlerId}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={handleClick}
    >
      {activeAdjacentSide === dropPositions.top && (
        <AdjacentDropzone position={dropPositions.top} />
      )}
      <div className={classes['icon-wrapper']}>
        <Icon />
      </div>
      <Text>
        {type}{' '}
        <Text span className={classes.name}>
          {name}
        </Text>
      </Text>
      {!isDragging && (
        <ActionIcon
          onClick={handleDeleteClick}
          variant="subtle"
          className={classes['delete-button']}
        >
          <CloseIcon />
        </ActionIcon>
      )}
      {activeAdjacentSide === dropPositions.bottom && (
        <AdjacentDropzone position={dropPositions.bottom} />
      )}
    </Card>
  );
};
