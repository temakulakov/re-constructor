import { isEmptyObject } from '@finch-cloud/common';
import { NormalizedNode, Node } from '~types';

export const getNodeData = ({
  nodeId,
  nodesById,
  options = { withIds: true },
}: {
  nodeId: number;
  nodesById: Record<string, NormalizedNode>;
  options?: { withIds: boolean };
}): Node | null => {
  if (!nodesById[nodeId]) {
    return null;
  }

  const { name, dynamicProps, childrenIds, data } = nodesById[nodeId];
  const children = childrenIds
    ?.map((id) => getNodeData({ nodeId: id, nodesById, options }))
    .filter(Boolean) as Node[];

  return {
    ...(options.withIds ? { $id: nodeId } : {}),
    name,
    data,
    dynamicProps,
    children,
  };
};

export const getDenormalizedTree = (
  nodesById: Record<string, NormalizedNode>,
  options: { withIds: boolean } = { withIds: true }
) => {
  if (isEmptyObject(nodesById)) {
    return {};
  }

  try {
    return getNodeData({ nodeId: 0, nodesById, options });
  } catch (err) {
    console.error(err);
    return {};
  }
};
