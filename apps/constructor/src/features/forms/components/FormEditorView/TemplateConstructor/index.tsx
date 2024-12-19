'use client';

import { forwardRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { FormBuilder } from '@finch-cloud/form-builder';
import { JSONObject } from '@finch-cloud/common';
import { useEditorStore } from '~features/editor/model/edtiorSlice';
import {
  constructorSchema,
  constructorUiSchema,
} from '~features/editor/model/schema';
import { getFormById, saveFormSchema } from '~features/editor/model/services';
import { Pane } from '~features/editor/components/Pane';
import { SettingsPopover } from './SettingsPopover';
import classes from './TemplateConstructor.module.css';

type TemplateConstructorProps = {
  formId: string;
};

export const TemplateConstructor = forwardRef<
  HTMLDivElement,
  TemplateConstructorProps
>(({ formId }, ref) => {
  const { setBuilderData, builderSettings, setBuilderSettings, builderData } =
    useEditorStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['form', formId],
    queryFn: () => getFormById({ id: formId as string }),
    enabled: !!formId,
  });

  const saveFormMutation = useMutation({
    mutationFn: saveFormSchema,
    onSuccess: (response) => {
      if (response) {
        router.push(`/forms/${response.id}`);
        queryClient.invalidateQueries({ queryKey: ['forms'] });
      }
    },
  });

  const onSubmit = async (values: JSONObject) => {
    saveFormMutation.mutate({ ...values, ...builderSettings });
  };

  useEffect(() => {
    if (data) {
      const { builder, name, description } = data;

      setBuilderData({
        fields: builder ?? [],
      });
      setBuilderSettings({ name, description });
    }
  }, [data, setBuilderData, setBuilderSettings]);

  const onChange = (value: JSONObject) => {
    setBuilderData(value);
  };

  return (
    <Pane
      snap
      ref={ref}
      title={`ID: ${formId ?? 'Новая форма'}`}
      toolbar={<SettingsPopover formId={formId} />}
    >
      <div className={classes.wrapper}>
        <FormBuilder
          value={builderData}
          onChange={onChange}
          onSubmit={onSubmit}
          schema={constructorSchema}
          uiSchema={constructorUiSchema}
        />
      </div>
    </Pane>
  );
});

TemplateConstructor.displayName = 'Allotment.Pane';
