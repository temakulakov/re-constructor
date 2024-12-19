'use client';

import { useState } from 'react';
import { Modal, Button, TextInput, Grid } from '@mantine/core';

import { initialProcess } from '~constants/initialProcess';
import { createProcess } from '~model';

type CreateProcessModalProps = {
  isOpened: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const CreateProcessModal = ({
  isOpened,
  close,
  onSuccess,
}: CreateProcessModalProps) => {
  const [processName, setNewProcessName] = useState('');

  const handleChangeName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;

    setNewProcessName(value);
  };

  const handleCreateProcess = async () => {
    await createProcess({ name: processName, schema: initialProcess });
    await onSuccess();
    close();
  };

  return (
    <Modal title="Выберите имя диаграммы" opened={isOpened} onClose={close}>
      <Grid>
        <Grid.Col>
          <TextInput value={processName} onChange={handleChangeName} />
        </Grid.Col>
        <Grid.Col>
          <Button type="button" onClick={handleCreateProcess}>
            Создать
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
