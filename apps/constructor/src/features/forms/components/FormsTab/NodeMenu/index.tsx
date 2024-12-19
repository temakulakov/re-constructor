import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Menu, Coords } from '@finch-cloud/common';
import { deleteForm } from '~features/editor/model/services';

type NodeMenuProps = {
  id: string;
  onClose: () => void;
  coordinates: Coords;
};

export const NodeMenu = ({ id, onClose, coordinates }: NodeMenuProps) => {
  const queryClient = useQueryClient();
  const deleteFormMutation = useMutation({
    mutationFn: () => deleteForm({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
  const [
    isDeleteDialogOpened,
    { toggle: toggleDeleteDialog, close: closeDeleteDialog },
  ] = useDisclosure(false);

  const handleCloseDeleteDialog = () => {
    closeDeleteDialog();
    onClose();
  };

  const handleDelete = () => {
    deleteFormMutation.mutate();
    handleCloseDeleteDialog();
  };

  const startDeleting = () => {
    toggleDeleteDialog();
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
      <Menu.Item onClick={startDeleting} closeMenuOnClick={false}>
        Удалить
      </Menu.Item>
      <Modal
        opened={isDeleteDialogOpened}
        withCloseButton
        onClose={handleCloseDeleteDialog}
        size="md"
        radius="md"
        centered
        title="Delete Form?"
      >
        <Group justify="flex-end">
          <Button onClick={handleCloseDeleteDialog} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </Menu>
  );
};
