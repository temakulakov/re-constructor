import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { PropInput } from '@finch-cloud/common';
import { templateServices } from '@finch-cloud/template-builder';
import { idCounter } from '../utils/idCounter';
import { createEmptyNode, getNodePath, normalize } from '../utils/nodes';
import {
  Directory,
  EditModes,
  File,
  Id,
  NodeTree,
  NodeTypes,
  Template,
} from '../types';

type TemplatesSlice = {
  nodesById: NodeTree;
  selectedId: Id | null;
  editedNodeId: Id | null;
  editMode: EditModes | null;
  createNode: (data: { parentId: Id; name: string; type: NodeTypes }) => void;
  renameNode: (data: { id: Id; name: string }) => void;
  moveNode: (data: { fromParentId: Id; toParentId: Id; id: Id }) => void;
  deleteNode: (data: { id: Id }) => void;
  initNodes: (tree: Template[]) => void;
  setSelectedId: (newId: Id | null) => void;
  startEditing: (data: { id: Id; editMode: EditModes }) => void;
  finishEditing: () => void;
};

const getAllDescendantIds = (
  state: TemplatesSlice['nodesById'],
  nodeId: Id
): Id[] => {
  if (!state || state[nodeId]?.type !== NodeTypes.DIRECTORY) {
    return [];
  }

  return (
    Object.values((state[nodeId] as Directory).childrenIds).reduce<Id[]>(
      (acc, id) => [...acc, id, ...getAllDescendantIds(state, id)],
      []
    ) ?? []
  );
};

export const useTemplatesStore = create<TemplatesSlice>()(
  devtools(
    immer((set, get) => ({
      nodesById: {},
      templateSettings: { inputs: [] as PropInput[] },
      selectedId: null!,
      editedNodeId: null,
      editMode: null,
      initNodes: (templates) => {
        set((state) => {
          idCounter.reset();
          const nodesById = normalize(templates);

          state.nodesById = nodesById;
        });
      },
      setSelectedId: (newId) => {
        set((state) => {
          state.selectedId = newId;
        });
      },
      createNode: async ({ parentId, name, type }) => {
        if (get().nodesById[0]) {
          if (parentId !== null) {
            const parentPath = getNodePath(get().nodesById, parentId);
            const path = `${parentPath}/${name}`;

            if (type === NodeTypes.FILE) {
              const { id: serverId } = await templateServices.createTemplate({
                name: path,
              });

              const node = createEmptyNode({
                parentId,
                name,
                type,
                data: {},
                serverId,
              });

              set((state) => {
                const parentNode = state.nodesById[parentId] as Directory;
                if (!parentNode.childrenIds) {
                  parentNode.childrenIds = [];
                }

                parentNode.childrenIds.push(node.id);
                state.nodesById[node.id] = node;
              });

              window.history.pushState(null, '', `/templates/${serverId}`);
            }

            if (type === NodeTypes.DIRECTORY) {
              const node = createEmptyNode({
                parentId,
                name,
                type,
              });

              set((state) => {
                const parentNode = state.nodesById[parentId] as Directory;
                if (!parentNode.childrenIds) {
                  parentNode.childrenIds = [];
                }

                parentNode.childrenIds.push(node.id);
                state.nodesById[node.id] = node;
              });
            }
          }
        }
      },
      renameNode: async ({ id, name }) => {
        const node = get().nodesById[id];

        if (node) {
          set((state) => {
            state.nodesById[id].name = name;
          });

          const { nodesById } = get();

          const changedNodes = (
            node.type === NodeTypes.DIRECTORY
              ? getAllDescendantIds(nodesById, id)
              : [id]
          )
            .filter((nodeId) => nodesById[nodeId].type === NodeTypes.FILE)
            .map((descendantId) => ({
              id: descendantId,
              path: getNodePath(nodesById, descendantId),
              name: nodesById[descendantId].name,
            }));

          await Promise.all(
            changedNodes.map((changedNode) =>
              templateServices.saveTemplate({
                ...nodesById[changedNode.id],
                id: (nodesById[changedNode.id] as File).serverId,
                name: changedNode.path,
              })
            )
          );
        }
      },
      moveNode: async ({ fromParentId, toParentId, id }) => {
        const node = get().nodesById[id];

        set((state) => {
          const parentNodes = (state.nodesById[fromParentId] as Directory)
            .childrenIds;

          (state.nodesById[fromParentId] as Directory).childrenIds =
            parentNodes.filter((childId) => childId !== id);
          (state.nodesById[toParentId] as Directory).childrenIds.push(id);
          state.nodesById[id].parentId = toParentId;
        });

        const { nodesById } = get();

        const changedNodes = (
          node.type === NodeTypes.FILE
            ? [id]
            : [id, ...getAllDescendantIds(nodesById, id)]
        )
          .filter((nodeId) => nodesById[nodeId].type === NodeTypes.FILE)
          .map((descendantId) => ({
            id: descendantId,
            path: getNodePath(nodesById, descendantId),
          }));

        await Promise.all(
          changedNodes.map((changedNode) =>
            templateServices.saveTemplate({
              ...nodesById[changedNode.id],
              id: (nodesById[changedNode.id] as File).serverId,
              name: changedNode.path,
            })
          )
        );
      },
      deleteNode: async ({ id }) => {
        const { nodesById } = get();
        const node = nodesById[id];

        if (!node) {
          return;
        }

        const { parentId } = node;
        // remove all descendant children and node itself
        const idsToDelete = [id, ...getAllDescendantIds(nodesById, id)];

        const filesToDelete = idsToDelete
          .map((idToDelete) => nodesById[idToDelete])
          .filter(
            (nodeToDelete) => nodeToDelete.type === NodeTypes.FILE
          ) as File[];

        await Promise.all(
          filesToDelete.map((fileToDelete) =>
            templateServices.deleteTemplate({
              id: fileToDelete.serverId,
            })
          )
        );

        set((state) => {
          idsToDelete.forEach(
            (idToDelete) => delete state.nodesById[idToDelete]
          );

          // remove child reference from parent
          if (parentId !== undefined && parentId !== null) {
            const parentNode = state.nodesById[parentId] as Directory;

            parentNode.childrenIds = parentNode.childrenIds!.filter(
              (childId) => childId !== id
            );
          }
        });
      },
      startEditing: ({ id, editMode }) => {
        set((state) => {
          state.editMode = editMode;
          state.editedNodeId = id;
        });
      },
      finishEditing: () => {
        set((state) => {
          state.editMode = null;
          state.editedNodeId = null;
        });
      },
    }))
  )
);
