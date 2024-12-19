'use client';

import { useEffect, useMemo, useState } from 'react';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { Select, TextInput, Textarea } from 'react-hook-form-mantine';
import { ActionIcon, Group, Popover, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cloneDeep from 'lodash/cloneDeep';

import { CloseIcon, EditIcon, PlusIcon, useForm } from '@finch-cloud/common';
import { inputNames, inputs } from '~constants/inputs';
import { useBuilderStore } from '~model/builderSlice';
import classes from './TemplateSettings.module.css';

type FieldProps = {
  control: Control;
  id: string;
  index: number;
  onClick: (index: number) => void;
  remove: (index: number) => void;
};

const Field = ({ control, index, remove, onClick }: FieldProps) => {
  const data = useWatch({
    control,
    name: `inputs.${index}`,
  });

  const handleClick = () => {
    onClick(index);
  };

  return (
    <div className={classes.field}>
      <Text>{data.name}</Text>
      <Group gap={2}>
        <ActionIcon variant="subtle" onClick={handleClick}>
          <EditIcon />
        </ActionIcon>
        <ActionIcon onClick={() => remove(index)} variant="subtle">
          <CloseIcon />
        </ActionIcon>
      </Group>
    </div>
  );
};

type DefaultValueInputProps = {
  control: Control;
  baseName: string;
};

const DefaultValueInput = ({ control, baseName }: DefaultValueInputProps) => {
  const typeRenderer = useWatch({
    control,
    name: `${baseName}.renderer`,
  });
  const name = `${baseName}.defaultValue`;
  const label = 'Default Value';
  const Renderer = useMemo(() => inputs[typeRenderer].renderer, [typeRenderer]);

  return <Renderer control={control} name={name} label={label} />;
};

export const TemplateSettings = () => {
  const { setTemplateSettings } = useBuilderStore();
  const [isPopoverAllowedToClose, setIsPopoverAllowedToClose] = useState(true);
  const { control, watch, setValue } = useForm({
    defaultValues: useBuilderStore.getState().templateSettings,
    // schema: validationSchema,
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: 'inputs',
    });

  useEffect(() => {
    const { unsubscribe } = watch((data) => {
      setTemplateSettings(cloneDeep(data));
    });
    return () => unsubscribe();
  }, [setTemplateSettings, watch]);

  const [
    isPropEditorPopoverOpened,
    {
      open: openPropEditorPopover,
      close: closePropEditorPopover,
      toggle: togglePropEditorPopover,
    },
  ] = useDisclosure(false);

  const handleFieldClick = (index: number) => {
    setSelectedIndex(index);
    openPropEditorPopover();
  };

  return (
    <form autoComplete="off">
      <input
        autoComplete="false"
        name="hidden"
        type="text"
        style={{ display: 'none' }}
      />
      <Stack>
        <Textarea name="description" label="Description" control={control} />
        <Popover
          width={300}
          position="left-start"
          withArrow
          shadow="md"
          offset={{ mainAxis: 20, crossAxis: 0 }}
          opened={isPropEditorPopoverOpened}
          onChange={togglePropEditorPopover}
          trapFocus
          closeOnClickOutside={isPopoverAllowedToClose}
        >
          <Popover.Target>
            <div>
              <div className={classes.toolbar}>
                <Text>Inputs</Text>
                <ActionIcon
                  ml="auto"
                  onClick={() => {
                    append({
                      name: `newInput${fields.length + 1}`,
                      label: `New Input ${fields.length + 1}`,
                      renderer: inputNames.TEXT_INPUT,
                      defaultValue: '',
                    });
                  }}
                >
                  <PlusIcon />
                </ActionIcon>
              </div>
              <div className={classes.fields}>
                {fields.map((item, index) => {
                  return (
                    <Field
                      key={item.id}
                      id={item.id}
                      index={index}
                      control={control}
                      remove={remove}
                      onClick={handleFieldClick}
                    />
                  );
                })}
              </div>
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            {selectedIndex !== null ? (
              <Stack key={selectedIndex}>
                <TextInput
                  name={`inputs.${selectedIndex}.name`}
                  label="Name"
                  control={control}
                  required
                  autoComplete="off"
                />
                <Select
                  name={`inputs.${selectedIndex}.renderer`}
                  label="Type"
                  control={control}
                  allowDeselect={false}
                  checkIconPosition="right"
                  required
                  onDropdownOpen={() => setIsPopoverAllowedToClose(false)}
                  onDropdownClose={() => setIsPopoverAllowedToClose(true)}
                  onChange={(newType) =>
                    setValue(
                      `inputs.${selectedIndex}.defaultValue`,
                      inputs[newType as keyof typeof inputs].defaultValue
                    )
                  }
                  data={[
                    { label: 'Text Input', value: 'TEXT_INPUT' },
                    { label: 'Number Input', value: 'NUMBER_INPUT' },
                    { label: 'Checkbox', value: 'CHECKBOX' },
                  ]}
                />
                <TextInput
                  name={`inputs.${selectedIndex}.label`}
                  label="Label"
                  control={control}
                  autoComplete="off"
                />
                <DefaultValueInput
                  control={control}
                  baseName={`inputs.${selectedIndex}`}
                  setValue={setValue}
                />
                <Textarea
                  name={`inputs.${selectedIndex}.description`}
                  label="Description"
                  control={control}
                />
              </Stack>
            ) : null}
          </Popover.Dropdown>
        </Popover>
      </Stack>
    </form>
  );
};
