import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  useBuilderStore,
  templateServices,
  getDenormalizedTree,
} from '@finch-cloud/template-builder';
import { notifications } from '~utils/notifications';

export const useTemplate = () => {
  const { id: templateId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data: template } = useQuery({
    queryKey: ['template', templateId],
    queryFn: () =>
      templateServices.getTemplateById({ id: templateId as string }),
    enabled: !!templateId,
  });

  const saveTemplateMutation = useMutation({
    mutationFn: templateServices.saveTemplate,
    onSuccess: () => {
      notifications.show({ type: 'success', title: 'Template saved' });
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });

  const saveTemplate = () => {
    if (template) {
      const { nodesById, templateSettings } = useBuilderStore.getState();
      const data = getDenormalizedTree(nodesById, { withIds: false });

      saveTemplateMutation.mutate({
        ...template,
        description: templateSettings.description ?? '',
        data: { layout: data, inputs: templateSettings.inputs ?? [] },
        id: templateId,
      });
    }
  };

  return { template, saveTemplate };
};
