import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Flex } from '@mantine/core';
import { createAjv, JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { usePrevious, useUncontrolled } from '@mantine/hooks';
// import isEmpty from 'lodash/isEmpty';

import { JSONObject } from '@finch-cloud/common';
import { UISchema, JsonSchema } from '~types';
import classes from './FormRenderer.module.css';

const ajv = createAjv({ useDefaults: true });
ajv.addFormat('textarea', '.*');
// const uiSchema = Generate.uiSchema(schema);

const emptyObject = Object.freeze({});

type FormRendererProps = {
  value?: JSONObject;
  onChange?: (value: JSONObject) => void;
  onSubmit?: (values: JSONObject) => void | Promise<void>;
  schema?: JsonSchema;
  initialData?: JSONObject;
  uiSchema?: UISchema;
  readonly?: boolean;
  renderers: JsonFormsRendererRegistryEntry[];
};

export const FormRenderer = memo(function FormRenderer({
  schema = emptyObject,
  initialData,
  uiSchema,
  value,
  onChange,
  onSubmit,
  readonly,
  renderers = [],
}: FormRendererProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_value, handleChange] = useUncontrolled({
    value,
    onChange,
  });
  const prevInitialData = usePrevious(initialData);

  useEffect(() => {
    if (initialData && initialData !== prevInitialData) {
      handleChange(initialData);
    }
  }, [handleChange, initialData, prevInitialData]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(_value);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }, [_value, onSubmit]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.editor}>
        <JsonForms
          schema={schema}
          uischema={uiSchema}
          renderers={renderers}
          ajv={ajv}
          data={_value}
          readonly={readonly}
          onChange={({ data }) => {
            handleChange(data);
          }}
        />
      </div>
      {/* {schema && !isEmpty(schema.properties) && ( */}
      <Flex w="100%" pt={12} justify="flex-end">
        <Button
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={readonly}
        >
          Submit
        </Button>
      </Flex>
      {/* )} */}
    </div>
  );
});
