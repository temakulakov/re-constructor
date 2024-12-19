import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getFormById } from '../../model/services';
import { FormRenderer } from './FormRenderer';

type ProcessFormProps = {
  formId: string;
  businessKey?: string;
};

export const ProcessForm = ({ formId, businessKey }: ProcessFormProps) => {
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
      <FormRenderer
        schema={template.schema}
        uiSchema={template.uiSchema}
        submitUrl={template.submitUrl}
        formId={formId}
        businessKey={businessKey}
      />
    </Box>
  );
};
