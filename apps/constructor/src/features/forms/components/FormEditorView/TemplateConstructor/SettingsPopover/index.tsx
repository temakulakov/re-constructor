import { SettingsIcon, useForm } from '@finch-cloud/common';
import { ActionIcon, Popover, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import omit from 'lodash/omit';
import { useMemo } from 'react';
import { Textarea, TextInput } from 'react-hook-form-mantine';
import { z } from 'zod';

import { useEditorStore } from '~features/editor/model/edtiorSlice';
import { getFormById } from '~features/editor/model/services';

const schema = z.object({
  businessKey: z.string(),
  name: z.string().trim().min(1),
  description: z.string(),
  submitUrl: z.string(),
});

type SettingsPopoverProps = {
  formId?: string;
};

export const SettingsPopover = ({ formId }: SettingsPopoverProps) => {
  const { setBuilderSettings, businessKey, setBusinessKey } = useEditorStore();

  const { data } = useQuery({
    queryKey: ['form', formId],
    queryFn: () => getFormById({ id: formId as string }),
    enabled: !!formId,
  });

  const initialValues = useMemo(
    () => ({
      businessKey: businessKey ?? '',
      name: data?.name ?? '',
      submitUrl: data?.submitUrl ?? '',
      description: data?.description ?? '',
    }),
    [data, businessKey]
  );

  const { control, handleSubmit, getValues, reset } = useForm({
    schema,
    defaultValues: initialValues,
  });

  useMemo(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  const saveSettings = () => {
    const values = getValues();
    setBusinessKey(values.businessKey);
    setBuilderSettings(omit(values, 'businessKey'));
  };

  return (
    <Popover
      width={300}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
      onClose={saveSettings}
    >
      <Popover.Target>
        <ActionIcon>
          <SettingsIcon />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              name="businessKey"
              control={control}
              label="Business key"
            />
            <TextInput
              name="name"
              control={control}
              label="Form name"
              required
            />
            <Textarea
              name="description"
              control={control}
              label="Form description"
            />
            <TextInput name="submitUrl" control={control} label="Submit URL" />
          </Stack>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
