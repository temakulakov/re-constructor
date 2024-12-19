import { PropsConfig } from '@finch-cloud/common';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getTemplateById } from '~model/services';

type UseTemplateInputsProps = {
  templateId: string | null;
};

export const useTemplateInputs = ({ templateId }: UseTemplateInputsProps) => {
  const { data: template } = useQuery({
    queryKey: ['template', templateId],
    queryFn: () => getTemplateById({ id: templateId as string }),
    enabled: !!templateId,
  });

  const templateInputs = useMemo(() => {
    if (templateId && template) {
      return {
        Props: { children: template.data?.inputs ?? [] },
      };
    }

    return {};
  }, [templateId, template]);

  return templateInputs;
};
