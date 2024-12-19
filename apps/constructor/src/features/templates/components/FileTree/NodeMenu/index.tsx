import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow';

import { Menu, Coords } from '@finch-cloud/common';
import { useTemplatesStore } from '~features/templates/model/templatesSlice';
import { EditModes, Id, NodeTypes } from '~features/templates/types';

type NodeMenuProps = {
  id: Id;
  onClose: () => void;
  coordinates: Coords;
};

export const NodeMenu = ({ id, onClose, coordinates }: NodeMenuProps) => {
  const nodeData = useTemplatesStore(
    useShallow((state) => state.nodesById[id])
  );
  const { deleteNode, startEditing } = useTemplatesStore();
  const [
    isDeleteDialogOpened,
    { open: toggleDeleteDialog, close: closeDeleteDialog },
  ] = useDisclosure(false);

  if (!nodeData) {
    return null;
  }

  const handleCloseDeleteDialog = () => {
    closeDeleteDialog();
    onClose();
  };

  const handleDelete = () => {
    deleteNode({ id });
    handleCloseDeleteDialog();
  };

  const startDeleting = () => {
    toggleDeleteDialog();
  };

  const startCreatingDirectory = () => {
    onClose();
    startEditing({ id, editMode: EditModes.CREATE_DIRECTORY });
  };

  const startCreatingFile = () => {
    onClose();
    startEditing({ id, editMode: EditModes.CREATE_FILE });
  };

  const startRenamingNode = () => {
    onClose();
    startEditing({ id, editMode: EditModes.RENAME_NODE });
  };

  return (
    <Menu
      opened={id !== null}
      coordinates={coordinates}
      onCloseMenu={onClose}
      position="bottom-start"
      withinPortal
      closeOnClickOutside={!isDeleteDialogOpened}
    >
      {[NodeTypes.DIRECTORY, NodeTypes.ROOT].includes(nodeData.type) && (
        <>
          <Menu.Item onClick={startCreatingFile}>Создать шаблон</Menu.Item>
          <Menu.Item onClick={startCreatingDirectory}>Создать папку</Menu.Item>
        </>
      )}
      {nodeData.type !== NodeTypes.ROOT && (
        <>
          <Menu.Item onClick={startRenamingNode}>Переименовать</Menu.Item>
          <Menu.Item onClick={startDeleting} closeMenuOnClick={false}>
            Удалить
          </Menu.Item>
        </>
      )}
      <Modal
        opened={isDeleteDialogOpened}
        withCloseButton
        onClose={handleCloseDeleteDialog}
        size="md"
        radius="md"
        centered
        title="Удалить шаблон?"
      >
        <Group justify="flex-end">
          <Button onClick={handleCloseDeleteDialog} variant="outline">
            Отмена
          </Button>
          <Button onClick={handleDelete}>Удалить</Button>
        </Group>
      </Modal>
    </Menu>
  );
};
