import setWith from 'lodash/setWith';

import { JSONObject, JSONValue } from '@finch-cloud/common';
import {
  Node,
  Id,
  NodeTypes,
  Directory,
  NodeTree,
  Template,
  File,
} from '../types';
import { idCounter } from './idCounter';

export const splitNodePath = (path?: string | null) =>
  path ? (path.startsWith('/') ? path.slice(1) : path).split('/') : [];

export const createEmptyNode = ({
  parentId,
  name,
  type,
  id,
  serverId,
}: {
  parentId: Id | null;
  name: string;
  type: NodeTypes;
  id?: Id;
  data?: JSONValue;
  serverId?: string;
}): Node => {
  if (type === NodeTypes.DIRECTORY || type === NodeTypes.ROOT) {
    const nodeId = id ?? idCounter.increment();

    return {
      id: nodeId,
      parentId,
      name,
      type,
      childrenIds: [],
    };
  }

  return {
    id: serverId!,
    parentId,
    name,
    type,
    serverId: serverId!,
  };
};

const isFileNode = (node: JSONValue): node is File =>
  Boolean(
    node &&
      typeof node === 'object' &&
      'serverId' in node &&
      typeof node.serverId === 'string'
  );

export const traverseNodeTree = (
  nodesTree: JSONObject,
  parentId: Id,
  nodesById: NodeTree
) => {
  Object.entries(nodesTree).forEach(([key, value]) => {
    const isFile = isFileNode(value);

    const data = createEmptyNode({
      parentId,
      name: key,
      type: isFile ? NodeTypes.FILE : NodeTypes.DIRECTORY,
      ...(isFile
        ? {
            serverId: value.serverId,
          }
        : {}),
    });

    const nodeId = data.id;

    nodesById[nodeId] = data;

    if (parentId !== null && nodesById[parentId].type !== NodeTypes.FILE) {
      (nodesById[parentId] as Directory).childrenIds.push(nodeId);
    }

    const isValidSubTree =
      !isFile &&
      !Array.isArray(value) &&
      value !== null &&
      typeof value === 'object';

    if (isValidSubTree) {
      traverseNodeTree(value as JSONObject, nodeId, nodesById);
    }
  });
};

export const normalize = (nodes: Template[]) => {
  const tree = nodes.reduce((acc, { id, name }) => {
    const splittedPath = splitNodePath(name);

    setWith(acc, splittedPath, { serverId: id }, Object);

    return acc;
  }, {});

  const nodesById: { [key: Id]: Node } = {
    0: createEmptyNode({
      name: 'root',
      parentId: null,
      type: NodeTypes.ROOT,
      id: 0,
    }),
  };

  traverseNodeTree(tree, 0, nodesById);

  return nodesById;
};

export const isNodeIdInDirectory = (
  nodeId: Id,
  nodesById: NodeTree,
  directoryId?: Id | null
) => {
  if (!nodeId || !directoryId) {
    return false;
  }

  const node = nodesById[nodeId];

  let { parentId } = node;

  while (parentId !== null && parentId !== undefined) {
    if (directoryId === parentId) {
      return true;
    }

    if (parentId === 0) {
      return false;
    }

    const parentNode = nodesById[parentId];
    parentId = parentNode.parentId;
  }

  return false;
};

export const getOrderedNodeChildren = (nodesById: NodeTree, id: Id) => {
  const node = nodesById[id] as Directory;

  const childrenIds = node?.childrenIds || [];

  const childrenNodes = childrenIds
    .map((chilId) => {
      const nodeData = nodesById[chilId];
      return { id: chilId, name: nodeData.name, type: nodeData.type };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return childrenNodes.reduce<{
    files: Id[];
    directories: Id[];
  }>(
    (acc, childNode) => {
      if (childNode.type === NodeTypes.DIRECTORY) {
        acc.directories.push(childNode.id);
      }

      if (childNode.type === NodeTypes.FILE) {
        acc.files.push(childNode.id);
      }

      return acc;
    },
    { files: [], directories: [] }
  );
};

export const getNodePath = (
  state: Record<Id, Node>,
  nodeId?: Id | null,
  path = ''
): string => {
  const node = nodeId ? state[nodeId] : null;

  if (!nodeId || !node) {
    return path;
  }

  const fullPath = getNodePath(
    state,
    node.parentId,
    `/${node.name}${path || ''}`
  );

  return fullPath;
};
