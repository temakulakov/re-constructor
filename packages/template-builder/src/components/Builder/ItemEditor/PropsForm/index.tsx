import { z } from 'zod';
import { memo } from 'react';
import { Accordion } from '@mantine/core';

import { JSONObject, useForm, PropsConfig } from '@finch-cloud/common';
import { Field } from './Field';
import classes from './PropsForm.module.css';

export type FieldValues = {
  [key: string]: string | number | null | string[] | number[] | FieldValues;
};

type PropsFormProps = {
  config: PropsConfig;
  initialData?: JSONObject;
  validationSchema?: z.ZodTypeAny;
};

export const PropsForm = memo(function PropsForm({
  config,
  validationSchema,
  initialData,
}: PropsFormProps) {
  const formProps = useForm({
    values: initialData,
    defaultValues: initialData,
    schema: validationSchema,
  });

  return (
    <form autoComplete="off">
      <input
        autoComplete="false"
        name="hidden"
        type="text"
        style={{ display: 'none' }}
      />
      <Accordion
        multiple
        defaultValue={Object.keys(config)}
        classNames={{ content: classes.content, control: classes.control }}
      >
        {Object.entries(config).map(([groupName, groupData]) => (
          <Accordion.Item key={groupName} value={groupName}>
            <Accordion.Control>{groupName}</Accordion.Control>
            <Accordion.Panel>
              {groupData.children.map((field) => (
                <Field
                  key={field.name}
                  control={formProps.control}
                  type={field.renderer}
                  name={field.name}
                  placeholder={field.placeholder}
                  label={field.label || field.name}
                  schema={field.validationSchema}
                  {...field.inputProps}
                />
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </form>
  );
});
