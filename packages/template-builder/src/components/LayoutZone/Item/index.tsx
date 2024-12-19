import { useEffect, useMemo, useRef, useState } from 'react';
import { ActionIcon } from '@mantine/core';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';
import cx from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import { CloseIcon } from '@finch-cloud/common';
import { useNodeData } from '~hooks/useNodeData';
import { useTemplateContext } from '~hooks/useTemplateContext';
import { CreatableDndItem, NodeDndItem } from '~components/Builder/types';
import { draggableItems, widgets } from '~components/Builder/constants';
import { Id } from '~types';
import { dropPositions } from '../constants';
import { AdjacentDropzone } from './AdjacentDropzone';
import classes from './Item.module.css';
import { useBuilderStore } from '~model/builderSlice';

type ItemProps = {
  onItemMove: (args: {
    initialIndex: number;
    targetIndex: number;
    parentId: Id;
  }) => void;
  onDeleteClick: (args: { id: Id; parentId: Id }) => void;
  onNewItemDrop: (args: {
    item: CreatableDndItem;
    afterId?: Id;
    beforeId?: Id;
    parentId: Id;
  }) => void;
  onClick: (id: Id) => void;
  onHover: (id: Id | null) => void;
  id: Id;
  parentId: Id | null;
  index: number;
};

export function Item({
  id,
  parentId,
  index,
  onItemMove,
  onNewItemDrop,
  onDeleteClick,
  onClick,
  onHover,
}: ItemProps) {
  const node = useBuilderStore(useShallow((state) => state.nodesById[id]));

  const isSelected = useBuilderStore(
    useShallow((state) => state.selectedId === id)
  );
  const isHovered = useBuilderStore(
    useShallow((state) => state.hoveredId === id)
  );
  const ref = useRef<HTMLDivElement>(null);
  const [activeAdjacentSide, setActiveAdjacentSide] = useState<
    keyof typeof dropPositions | null
  >(null);

  // TODO: move to separate hook
  const [{ handlerId, isOverCurrent, canDrop, isOver }, dropRef] = useDrop<
    NodeDndItem | CreatableDndItem,
    void,
    {
      handlerId: Identifier | null;
      isOverCurrent: boolean;
      canDrop: boolean;
      isOver: boolean;
    }
  >({
    accept: [draggableItems.CREATABLE_ITEM, draggableItems.DRAGGABLE_ITEM],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
    drop(item: NodeDndItem | CreatableDndItem) {
      if (item.type === draggableItems.CREATABLE_ITEM && isOverCurrent) {
        onNewItemDrop({
          item,
          parentId: activeAdjacentSide ? parentId : id,
          ...(activeAdjacentSide === dropPositions.top
            ? { beforeId: id }
            : { afterId: id }),
        });
      }

      if (item.type === draggableItems.DRAGGABLE_ITEM && isOverCurrent) {
        console.log(item.index, index, parentId);
        onItemMove({ initialIndex: item.index, targetIndex: index, parentId });
      }

      setActiveAdjacentSide(null);
    },
    hover(item: NodeDndItem | CreatableDndItem, monitor) {
      setActiveAdjacentSide(null);

      if (!ref.current || id === 0) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex && !isOverCurrent) {
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
      return {
        id,
        type: draggableItems.DRAGGABLE_ITEM,
        index,
        data: {
          id,
          index,
        },
      };
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

  drag(dropRef(ref));

  const widget = useMemo(() => widgets[node?.name], [node]);
  const templateContext = useTemplateContext();
  const calcedProps = useNodeData({
    props: node?.data,
    propsConfig: widget?.propsConfig,
    dynamicProps: node?.dynamicProps,
    context: templateContext,
  });
  const [
    { canDrop: canDropPlaceholder, isOverCurrent: isOverPlaceholder },
    emptyDropRef,
  ] = useDrop<
    CreatableDndItem,
    void,
    { canDrop: boolean; isOverCurrent: boolean }
  >({
    accept: draggableItems.CREATABLE_ITEM,
    canDrop: () => true,
    drop: (item) => {
      if (item.type === draggableItems.CREATABLE_ITEM && isOverPlaceholder) {
        onNewItemDrop({
          item,
          parentId: id,
        });
      }
      setActiveAdjacentSide(null);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const children = useMemo(
    () =>
      widget?.config.canHaveChildren
        ? node?.childrenIds?.map((childId, childIndex) => (
            <Item
              key={childId}
              id={childId}
              parentId={id}
              onItemMove={onItemMove}
              onNewItemDrop={onNewItemDrop}
              onDeleteClick={onDeleteClick}
              onClick={onClick}
              onHover={onHover}
              isSelected={false}
              index={childIndex}
            />
          ))
        : null,
    [
      id,
      node?.childrenIds,
      onClick,
      onHover,
      onDeleteClick,
      onItemMove,
      onNewItemDrop,
      widget,
    ]
  );

  const Component = widget?.component;

  if (!Component) {
    return null;
  }

  const Icon = widget.config.icon;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick(id);
  };

  const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onHover(id);
  };

  const handleResetHover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onHover(null);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleteClick({ id, parentId });
  };

  const isDeleteButtonShown =
    !isDragging && id !== 0 && (isSelected || isHovered);

  return (
    <div
      className={cx(
        classes.item,
        (isSelected || isHovered) && classes.item_selected
      )}
      ref={ref}
      data-handler-id={handlerId}
      onClick={handleClick}
      onMouseOver={handleHover}
      onMouseLeave={handleResetHover}
    >
      {activeAdjacentSide === dropPositions.top && isOverCurrent && (
        <AdjacentDropzone position={dropPositions.top} />
      )}
      {widget.config.canHaveChildren ? (
        <Component {...calcedProps}>
          {...widget.config.canHaveChildren && children?.length ? children : []}
          {widget.config.canHaveChildren && children?.length === 0 ? (
            <div
              className={cx(
                classes.dropzone,
                canDropPlaceholder &&
                  isOverPlaceholder &&
                  classes.dropzone_active
              )}
              ref={emptyDropRef}
            >
              <p>
                <span>{widget.config.label}</span>
                &nbsp;children. Drop elements here
              </p>
            </div>
          ) : null}
        </Component>
      ) : (
        <Component {...calcedProps} />
      )}
      {/* <div className={classes['icon-wrapper']}>
        <Icon />
      </div>
      <Text>
        {type}{' '}
        <Text span className={classes.name}>
          {name}
        </Text>
      </Text> */}
      {isDeleteButtonShown && (
        <ActionIcon
          onClick={handleDeleteClick}
          variant="subtle"
          className={classes['delete-button']}
        >
          <CloseIcon />
        </ActionIcon>
      )}
      {activeAdjacentSide === dropPositions.bottom && isOverCurrent && (
        <AdjacentDropzone position={dropPositions.bottom} />
      )}
    </div>
  );
}
