import { memo } from 'react';
import { useDrop } from 'react-dnd';
import cx from 'clsx';

import { Id, NodeTypes } from '~features/templates/types';
import { useTemplatesStore } from '~features/templates/model/templatesSlice';
import { SubTree } from '../SubTree';
import classes from '../FileTree.module.css';

export const Root = memo(() => {
  const { moveNode } = useTemplatesStore();
  const [{ isOverCurrent, isDroppable }, dropRef] = useDrop<
    {
      parentId: Id;
      id: Id;
    },
    unknown,
    { isOver: boolean; isOverCurrent: boolean; isDroppable: boolean }
  >(
    () => ({
      accept: [NodeTypes.FILE],
      canDrop: (item, monitor) => {
        return item.parentId !== 0 && monitor.isOver({ shallow: true });
      },
      drop(item, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) {
          return;
        }
        moveNode({ id: item.id, fromParentId: item.parentId, toParentId: 0 });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        isDroppable: monitor.canDrop(),
      }),
    }),
    []
  );

  return (
    <div
      className={cx(
        classes.dropzone,
        isOverCurrent && isDroppable && classes.dropzone_droppable
      )}
      ref={dropRef}
    >
      <SubTree id={0} />
    </div>
  );
});
