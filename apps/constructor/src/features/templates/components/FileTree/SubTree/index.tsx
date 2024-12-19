import { useState, useEffect } from 'react';
import { Text } from '@mantine/core';
import { useDrag, useDrop } from 'react-dnd';
import { useShallow } from 'zustand/react/shallow';
import cx from 'clsx';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { FolderIcon, FolderOpenedIcon, FileIcon } from '@finch-cloud/common';
import { EditNodeName } from '../EditNodeName';
import { EditModes, Id, NodeTypes } from '~features/templates/types';
import { useTemplatesStore } from '~features/templates/model/templatesSlice';
import {
  getOrderedNodeChildren,
  isNodeIdInDirectory,
} from '~features/templates/utils/nodes';
import classes from '../FileTree.module.css';

type SubTreeProps = {
  id: Id;
  indent?: number;
};

export function SubTree({ id, indent = 0 }: SubTreeProps) {
  const editMode = useTemplatesStore(
    useShallow((state) => id === state.editedNodeId && state.editMode)
  );
  const { files, directories } = useTemplatesStore(
    useShallow((state) => getOrderedNodeChildren(state.nodesById, id))
  );
  const { createNode, finishEditing } = useTemplatesStore();

  const handleCreateNode = (nodeName: string, nodeType: NodeTypes) => {
    if (nodeName) {
      createNode({ parentId: id, name: nodeName, type: nodeType });
    }
    finishEditing();
  };

  return (
    <div>
      {directories.map((nodeId) => (
        <Node key={nodeId} id={nodeId} parentId={id} indent={indent + 1} />
      ))}
      {editMode === EditModes.CREATE_DIRECTORY && (
        <EditNodeName
          nodeType={NodeTypes.DIRECTORY}
          indent={indent + 1}
          onEditFinished={handleCreateNode}
          parentId={id}
        />
      )}
      {files.map((nodeId) => (
        <Node key={nodeId} id={nodeId} parentId={id} indent={indent + 1} />
      ))}
      {editMode === EditModes.CREATE_FILE && (
        <EditNodeName
          nodeType={NodeTypes.FILE}
          indent={indent + 1}
          onEditFinished={handleCreateNode}
          parentId={id}
        />
      )}
    </div>
  );
}

type NodeProps = {
  id: Id;
  parentId: Id;
  indent: number;
};

function Node({ id, ...props }: NodeProps) {
  const nodeData = useTemplatesStore(
    useShallow((state) => state.nodesById[id])
  );
  const { renameNode, finishEditing } = useTemplatesStore();
  const isSelected = useTemplatesStore(
    useShallow((state) => id === state.selectedId)
  );
  const editMode = useTemplatesStore(
    useShallow((state) => id === state.editedNodeId && state.editMode)
  );

  const isEditing = editMode === EditModes.RENAME_NODE;
  const isCreating = Boolean(
    editMode &&
      [EditModes.CREATE_DIRECTORY, EditModes.CREATE_FILE].includes(editMode)
  );

  if (nodeData) {
    const { type } = nodeData;

    const rename = (newName: string) => {
      if (newName !== '' && newName !== nodeData?.name) {
        renameNode({ id, name: newName });
      }

      finishEditing();
    };

    if (type === NodeTypes.DIRECTORY) {
      return (
        <Directory
          isSelected={isSelected}
          isEditing={isEditing}
          isCreating={isCreating}
          onRename={rename}
          {...nodeData}
          {...props}
        />
      );
    }

    if (type === NodeTypes.FILE) {
      if (isEditing) {
        return (
          <EditNodeName
            nodeType={nodeData.type}
            defaultValue={nodeData.name}
            onEditFinished={rename}
            id={id}
            {...props}
          />
        );
      }

      return <File {...nodeData} {...props} />;
    }
  }

  return null;
}

type BaseNodeProps = {
  id: Id;
  parentId: Id;
  name: string;
  indent: number;
};

type DirectoryProps = BaseNodeProps & {
  isEditing: boolean;
  isCreating: boolean;
  onRename: (name: string) => void;
  isSelected: boolean;
};

function Directory({
  id,
  name,
  indent,
  isSelected,
  isEditing,
  isCreating,
  onRename,
  parentId,
}: DirectoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { moveNode } = useTemplatesStore();
  const { id: currentTemplateId } = useParams<{ id: string }>();
  const isNodeIdInNodeTreeBranch = useTemplatesStore(
    useShallow((state) =>
      isNodeIdInDirectory(currentTemplateId, state.nodesById, id)
    )
  );

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isNodeIdInNodeTreeBranch) {
      setIsOpen(true);
    }
  }, [isNodeIdInNodeTreeBranch]);

  useEffect(() => {
    if (isCreating) {
      setIsOpen(true);
    }
  }, [isCreating]);

  const [, dragRef] = useDrag(() => ({
    type: NodeTypes.DIRECTORY,
    item: { id, parentId, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOverCurrent, isDroppable }, dropRef] = useDrop<
    {
      parentId: Id;
      id: Id;
      name: string;
    },
    unknown,
    { isOver: boolean; isOverCurrent: boolean; isDroppable: boolean }
  >(
    () => ({
      accept: [NodeTypes.FILE],
      canDrop: (item, monitor) => {
        return (
          parentId !== item.id &&
          id !== item.id &&
          id !== item.parentId &&
          monitor.isOver({ shallow: true })
        );
      },
      drop(item, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) {
          return;
        }

        moveNode({
          id: item.id,
          fromParentId: item.parentId,
          toParentId: id,
        });
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
      {isEditing ? (
        <EditNodeName
          nodeType={NodeTypes.DIRECTORY}
          defaultValue={name}
          onEditFinished={onRename}
          indent={indent}
          parentId={parentId}
          id={id}
        />
      ) : (
        <div
          className={cx(classes.item, isSelected && classes.active)}
          onClick={toggle}
          data-file-id={id}
          ref={dragRef}
          style={{ paddingLeft: indent * 8 }}
        >
          <div className={classes['icon-wrapper']}>
            {isOpen && <FolderOpenedIcon />}
            {!isOpen && <FolderIcon />}
          </div>
          <Text size="sm" className={classes['file-name']}>
            {name}
          </Text>
        </div>
      )}
      {isOpen ? <SubTree id={id} indent={indent} /> : null}
    </div>
  );
}

type FileProps = BaseNodeProps & { serverId: string };

function File({ id, parentId, name, serverId, indent }: FileProps) {
  const { id: templateId } = useParams<{ id: string }>();
  const [, dragRef] = useDrag(() => ({
    type: NodeTypes.FILE,
    item: { id, parentId },
  }));

  return (
    <Link
      className={cx(classes.item, serverId === templateId && classes.active)}
      href={`/templates/${serverId}`}
      data-file-id={id}
      ref={dragRef}
      style={{ paddingLeft: indent * 8 }}
    >
      <div className={classes['icon-wrapper']}>
        <FileIcon />
      </div>
      <Text size="sm" className={classes['file-name']}>
        {name}
      </Text>
    </Link>
  );
}
