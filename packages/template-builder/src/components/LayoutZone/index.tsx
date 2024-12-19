'use client';

import { ScrollArea } from '@mantine/core';
import { useCallback, useRef } from 'react';

import { Id } from '~types';
import { CreatableDndItem } from '~components/Builder/types';
import { useBuilderStore } from '~model/builderSlice';
import { Item } from './Item';
import { useDndScrolling } from './useDndScrolling';
import classes from './LayoutZone.module.css';

export const LayoutZone = () => {
  const {
    deleteNode,
    moveNode,
    createNode,
    setSelectedId,
    setHoveredId,
    nodesById,
  } = useBuilderStore();
  const ref = useRef<HTMLDivElement>(null);

  useDndScrolling(ref);

  const swapItems = useCallback(
    ({
      initialIndex,
      targetIndex,
      parentId,
    }: {
      initialIndex: number;
      targetIndex: number;
      parentId: Id;
    }) => {
      setSelectedId(null);
      moveNode({ initialIndex, parentId, targetIndex });
    },
    [moveNode, setSelectedId]
  );

  const deleteItem = useCallback(
    ({ id, parentId }: { id: Id; parentId: Id }) => {
      setSelectedId(null);
      deleteNode({ id, parentId });
    },
    [deleteNode, setSelectedId]
  );

  const insertItemAtIndex = useCallback(
    ({
      item,
      beforeId,
      afterId,
      parentId,
    }: {
      item: CreatableDndItem;
      afterId?: Id;
      beforeId?: Id;
      parentId: Id;
    }) => {
      setSelectedId(null);
      createNode({
        parentId,
        nodeData: { name: item.data.name, data: item.data.itemProps },
        beforeId,
        afterId,
      });
    },
    [createNode, setSelectedId]
  );

  const handleItemClick = (id: Id | null) => {
    setSelectedId(id);
  };

  const handleItemHover = (id: Id | null) => {
    setHoveredId(id);
  };

  const resetSelection = () => {
    setSelectedId(null);
  };

  return (
    <ScrollArea
      className={classes.wrapper}
      offsetScrollbars
      onClick={resetSelection}
      ref={ref}
    >
      {nodesById?.[0] ? (
        <Item
          id={0}
          parentId={0}
          index={0}
          onItemMove={swapItems}
          onDeleteClick={deleteItem}
          onNewItemDrop={insertItemAtIndex}
          onClick={handleItemClick}
          onHover={handleItemHover}
        />
      ) : null}
    </ScrollArea>
  );
};
