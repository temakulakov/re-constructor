import { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import cx from 'clsx';
import {
  ArrayControlProps,
  composePaths,
  Resolve,
  update,
} from '@jsonforms/core';
import { useJsonForms } from '@jsonforms/react';

import { draggableItems } from '../constants';
import { Item } from './Item';
import classes from './LayoutZone.module.css';
import { DndItem } from '../types';

type LayoutZoneProps = ArrayControlProps & {
  selectedIndex: number | null;
  selectItem: (index: number | null) => void;
  onItemClick: (index: number) => void;
};

export const LayoutZone = ({
  data: itemsCount,
  path,
  onItemClick,
  selectedIndex,
  selectItem,
}: LayoutZoneProps) => {
  const ctx = useJsonForms();

  const swapItems = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      selectItem(null);
      ctx.dispatch?.(
        update(path, (prevItems) => {
          const itemsCopy = [...prevItems];
          itemsCopy.splice(dragIndex, 1);
          itemsCopy.splice(hoverIndex, 0, prevItems[dragIndex]);

          return itemsCopy;
        })
      );
    },
    [ctx, path, selectItem]
  );

  const deleteItem = useCallback(
    (index: number) => {
      selectItem(null);
      ctx.dispatch?.(
        update(path, (prevItems) => {
          const itemsCopy = [...prevItems];
          itemsCopy.splice(index, 1);

          return itemsCopy;
        })
      );
    },
    [selectItem, ctx, path]
  );

  const appendItem = useCallback(
    (item: DndItem) => {
      ctx.dispatch?.(
        update(path, (prevItems = []) => {
          return [...prevItems, item.data];
        })
      );
    },
    [path, ctx]
  );

  const insertItemAtIndex = useCallback(
    (item: DndItem, index: number) => {
      selectItem(null);
      ctx.dispatch?.(
        update(path, (prevItems = []) => {
          return [
            ...prevItems.slice(0, index),
            item.data,
            ...prevItems.slice(index),
          ];
        })
      );
    },
    [ctx, path, selectItem]
  );

  const handleItemClick = (index: number) => {
    onItemClick(index);
  };

  const [{ canDrop, isOverCurrent }, dropRef] = useDrop<
    DndItem,
    void,
    { canDrop: boolean; isOverCurrent: boolean }
  >({
    accept: draggableItems.CREATABLE_ITEM,
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrent) {
        appendItem(item);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div className={classes.wrapper}>
      {itemsCount > 0
        ? Array.from({ length: itemsCount }, (_, index) => {
            const childPath = composePaths(path, `${index}`);
            const childData = Resolve.data(ctx.core?.data, childPath);

            if (!childData) {
              return null;
            }

            return (
              <Item
                key={index}
                index={index}
                name={childData.field.name}
                type={childData.field.type}
                onItemMove={swapItems}
                onDeleteClick={deleteItem}
                onNewItemDrop={insertItemAtIndex}
                onClick={handleItemClick}
                isSelected={selectedIndex === index}
              />
            );
          })
        : null}
      <div
        className={cx(classes.dropzone, canDrop && classes.dropzone_active)}
        ref={dropRef}
      >
        Drag elements here
      </div>
    </div>
  );
};
