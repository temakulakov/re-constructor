import { isEmptyObject, JSONObject } from '@finch-cloud/common';
import { Id, Node, NodeTree, NormalizedNode } from '~types';
import { idCounter } from './idCounter';

export const getNormalizedTreeData = (
  nodeTree: NodeTree,
  nodeParentId: Id | null = null
) => {
  const nodesById: Record<Id, NormalizedNode> = {};

  function traverseNodeTree({
    data,
    name,
    children,
    parentId,
    dynamicProps,
  }: {
    data: Node['data'];
    parentId: Id | null;
    name: Node['name'];
    children?: Node[];
    dynamicProps: Node['dynamicProps'];
  }) {
    const nodeId = idCounter.getCurrent();

    if (!nodesById[nodeId]) {
      nodesById[nodeId] = {
        id: nodeId,
        parentId: parentId ?? null,
        data,
        childrenIds: [],
        dynamicProps,
        name,
      };
    }

    const currentNode = nodesById[nodeId];

    if (children) {
      children.forEach((child) => {
        const childId = idCounter.increment();
        currentNode.childrenIds!.push(childId);

        traverseNodeTree({
          data: child.data,
          parentId: nodeId,
          name: child.name,
          children: child.children,
          dynamicProps: child.dynamicProps,
        });
      });
    }
  }

  traverseNodeTree({
    data: nodeTree.data,
    children: nodeTree.children,
    parentId: nodeParentId,
    name: nodeTree.name,
    dynamicProps: nodeTree.dynamicProps,
  });

  return nodesById;
};
