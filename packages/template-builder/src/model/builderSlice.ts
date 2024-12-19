import { create } from 'zustand';
import { current } from 'immer';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { JSONObject, JSONValue } from '@finch-cloud/common';
import { PropInput } from '@finch-cloud/common';
import { idCounter } from '~utils/tree/idCounter';
import { getNormalizedTreeData } from '~utils/tree/getNormalizedTree';
import { Id, Node, NodeTree, NormalizedNode } from '~types';
import { isObjectNodeData } from '~utils/node';
import { TabNames, tabNames } from '~constants/tabs';

type BuilderSlice = {
  nodesById: Record<Id, NormalizedNode>;
  selectedId: Id | null;
  hoveredId: Id | null;
  currentTemplateId: string | null;
  selectedTab: TabNames;
  templateSettings: {
    description?: string;
    inputs: PropInput[];
  };
  createNode: (data: {
    parentId: Id;
    adjacentId?: Id;
    beforeId?: Id;
    afterId?: Id;
    nodeData: Node;
  }) => void;
  setNodeData: (data: { id: Id; data: JSONValue; property: string }) => void;
  moveNode: (data: {
    parentId: number;
    initialIndex: number;
    targetIndex: number;
  }) => void;
  deleteNode: (data: { parentId?: Id; attributeName?: string; id: Id }) => void;
  initNodesFromTree: (tree: NodeTree) => void;
  setSelectedId: (newId: Id | null) => void;
  setCurrentTemplateId: (newId: string | null) => void;
  setHoveredId: (newId: Id | null) => void;
  setSelectedTab: (newId: TabNames) => void;
  setIsNodePropDynamic: (data: {
    id: Id;
    isDynamic: boolean;
    propName: string;
  }) => void;
  setTemplateSettings: (data: {
    description?: string;
    inputs: PropInput[];
  }) => void;
};

const getAllDescendantIds = (
  nodesById: BuilderSlice['nodesById'],
  nodeId: Id
): Id[] => {
  if (!nodesById || !nodesById[nodeId]?.childrenIds) {
    return [];
  }

  return (
    nodesById[nodeId].childrenIds?.reduce<Id[]>(
      (acc, id) => [...acc, id, ...getAllDescendantIds(nodesById, id)],
      []
    ) ?? []
  );
};

export const useBuilderStore = create<BuilderSlice>()(
  // persist(
  devtools(
    immer((set) => ({
      nodesById: {},
      templateSettings: { inputs: [] as PropInput[] },
      selectedId: null!,
      hoveredId: null!,
      currentTemplateId: null!,
      selectedTab: tabNames.createableItems,
      initNodesFromTree: (tree) => {
        set((state) => {
          idCounter.reset();

          const nodesById = getNormalizedTreeData(tree);

          state.nodesById = nodesById;
          state.selectedTab = 'createableItems';
        });
      },
      setTemplateSettings: (data) => {
        set((state) => {
          state.templateSettings = data;
        });
      },
      setCurrentTemplateId: (newId) => {
        set((state) => {
          state.currentTemplateId = newId;
        });
      },
      setSelectedId: (newId) => {
        set((state) => {
          state.selectedId = newId;
          state.selectedTab = tabNames.itemSettings;
        });
      },
      setHoveredId: (newId) => {
        set((state) => {
          state.hoveredId = newId;
        });
      },
      setSelectedTab: (newTab) => {
        set((state) => {
          state.selectedTab = newTab;
        });
      },
      createNode: ({ parentId, nodeData, beforeId, afterId }) => {
        set((state) => {
          if (state.nodesById[0]) {
            const $id = idCounter.increment();
            state.selectedId = $id as number;

            if (parentId !== null) {
              const parentNode = state.nodesById[parentId];

              if (!parentNode.childrenIds) {
                parentNode.childrenIds = [];
              }

              const ids = parentNode.childrenIds;

              if (beforeId) {
                state.nodesById[parentId].childrenIds = ids.flatMap(
                  (childId) => (childId === beforeId ? [$id, childId] : childId)
                );
              } else if (afterId) {
                state.nodesById[parentId].childrenIds = ids.flatMap(
                  (childId) => (childId === afterId ? [afterId, $id] : childId)
                );
              } else {
                state.nodesById[parentId].childrenIds = [...ids, $id];
              }
            }
          }

          const normalizedData = getNormalizedTreeData(nodeData, parentId);
          Object.assign(state.nodesById, normalizedData);
        });
      },
      setIsNodePropDynamic: ({ id, propName, isDynamic }) => {
        set((state) => {
          if (!state.nodesById[id].dynamicProps) {
            state.nodesById[id].dynamicProps = {};
          }

          if (!isDynamic) {
            delete state.nodesById[id].dynamicProps![propName];
          } else {
            state.nodesById[id].dynamicProps![propName] = propName;
          }
        });
      },
      setNodeData: ({ id, data, property }) => {
        set((state) => {
          const node = state.nodesById[id];

          if (node) {
            if (!node.data) {
              node.data = {};
            }
            node.data[property] = data;
          }
        });
      },
      moveNode: ({ initialIndex, parentId, targetIndex }) => {
        set((state) => {
          const currentParentChildrenIds = current(
            state.nodesById[parentId]?.childrenIds
          );
          const parentChildrenIds = currentParentChildrenIds
            ? [...currentParentChildrenIds]
            : [];

          if (
            initialIndex < parentChildrenIds.length &&
            targetIndex < parentChildrenIds.length
          ) {
            [parentChildrenIds[initialIndex], parentChildrenIds[targetIndex]] =
              [parentChildrenIds[targetIndex], parentChildrenIds[initialIndex]];

            state.nodesById[parentId].childrenIds = parentChildrenIds;
          }
        });
      },
      deleteNode: ({ id, parentId }) => {
        set((state) => {
          // remove all descendant children and node itself
          const idsToDelete = [
            id,
            ...getAllDescendantIds(current(state.nodesById), id),
          ];
          idsToDelete.forEach(
            (idToDelete) => delete state.nodesById[idToDelete]
          );

          // remove child reference from parent attribute array
          if (parentId !== undefined) {
            const parentChildren = state.nodesById[parentId].childrenIds;

            state.nodesById[parentId].childrenIds = parentChildren!.filter(
              (childId) => childId !== id
            );
          }

          // if deleting root node
          if (id === 0) {
            idCounter.reset();
          }
        });
      },
    }))
  )
  //   {
  //     name: 'builder-storage',
  //     storage: createJSONStorage(() => localStorage),
  //     version: 4,
  //   }
  // )
);

// export const useBuilderStore = create(builderSlice);
