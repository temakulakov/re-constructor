'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { ActionIcon, Title } from '@mantine/core';

import { PlusIcon } from '@finch-cloud/common';
import { FileTree } from '~features/templates';
import { PACKAGE_VERSION } from '~constants/packageVersion';
import { EditModes } from '~features/templates/types';
import { useTemplatesStore } from '~features/templates/model/templatesSlice';
import classes from './TemplatesTab.module.css';

export const TemplatesTab = memo(function TemplatesTab() {
  const router = useRouter();
  const { startEditing } = useTemplatesStore();

  const onCreateClick = () => {
    startEditing({ id: 0, editMode: EditModes.CREATE_FILE });
    router.push('/templates');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.toolbar}>
        <Title order={3} size={14} className={classes.title}>
          FINCH Templates v{PACKAGE_VERSION}
        </Title>
        <ActionIcon ml="auto" onClick={onCreateClick}>
          <PlusIcon />
        </ActionIcon>
      </div>
      <FileTree />
    </div>
  );
});
