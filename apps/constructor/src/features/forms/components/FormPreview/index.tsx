import { memo, useMemo } from 'react';
import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getFormById } from '~features/editor/model/services';

import { TemplateFormRenderer } from '../TemplateFormRenderer';

export const FormPreview = memo(function FormPreview() {
  const { id: formId } = useParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ['forms', formId],
    queryFn: () => getFormById({ id: formId }),
    enabled: !!formId,
  });

  const template = useMemo(() => {
    if (data) {
      return {
        uiSchema: data.uiSchema,
        schema: data.schema,
        submitUrl: data.submitUrl,
      };
    }

    return null;
  }, [data]);

  if (!template) {
    return null;
  }

  return (
    <Box maw={400} p={20}>
      <TemplateFormRenderer
        schema={template.schema}
        uiSchema={template.uiSchema}
        submitUrl={template.submitUrl}
        formId={formId}
      />
    </Box>
  );
});
