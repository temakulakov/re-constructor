'use client';

import { memo } from 'react';
import { Allotment } from 'allotment';
import { ActionIcon } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import { SaveIcon } from '@finch-cloud/common';
import { Builder } from '@finch-cloud/template-builder';
import { Pane } from '~features/editor/components/Pane';
import { useTemplatesStore } from '~features/templates/model/templatesSlice';
import { useTemplate } from '~features/templates/hooks/useTemplate';
import classes from './TemplateEditorView.module.css';

export const TemplateEditorView = memo(function TemplateEditorView() {
  const { id: templateId } = useParams<{ id: string }>();
  const templateName = useTemplatesStore(
    useShallow((state) =>
      templateId ? state.nodesById[templateId]?.name : null
    )
  );
  const { saveTemplate } = useTemplate();

  return (
    <Allotment>
      <Pane
        snap
        title={templateName}
        toolbar={
          <ActionIcon>
            <SaveIcon onClick={saveTemplate} />
          </ActionIcon>
        }
      >
        <div className={classes.wrapper}>
          <Builder templateId={templateId} key={templateId} />
        </div>
      </Pane>
    </Allotment>
  );
});
