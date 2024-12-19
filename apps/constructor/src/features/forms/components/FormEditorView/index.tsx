'use client';

import { memo } from 'react';
import { Allotment } from 'allotment';
import { useParams } from 'next/navigation';

import { TemplateRenderer } from './TemplateRenderer';
import { TemplateConstructor } from './TemplateConstructor';

export const FormEditorView = memo(function FormEditorView() {
  const { id: formId } = useParams<{ id: string }>();

  return (
    <Allotment defaultSizes={[800, 300]}>
      <TemplateConstructor formId={formId} />
      <TemplateRenderer formId={formId} />
    </Allotment>
  );
});
