'use client';

import { memo, useState } from 'react';
import { Box } from '@mantine/core';

import { JSONObject } from '@finch-cloud/common';
import { FormBuilder, JsonSchema, UISchema } from '@finch-cloud/form-builder';
import { sendFormData } from '~features/editor/model/services';

type FormRendererProps = {
  schema: JsonSchema;
  uiSchema: UISchema;
  initialData?: JSONObject;
  submitUrl: string;
  formId?: string | null;
  businessKey?: string;
  onSubmit?: (response: JSONObject) => void;
  readonly?: boolean;
};

export const TemplateFormRenderer = memo(
  ({
    uiSchema,
    schema,
    submitUrl,
    formId,
    businessKey,
    onSubmit,
    initialData,
    readonly,
  }: FormRendererProps) => {
    const [formResultUiSchema, setFormResultUiSchema] =
      useState<UISchema | null>(null);
    const handleSubmit = async (values: JSONObject) => {
      const response = await sendFormData({
        formData: values,
        formId,
        url: submitUrl,
        businessKey,
      });

      if (response) {
        onSubmit?.(response as JSONObject);

        if (response.type === 'RENDER_VIEW') {
          setFormResultUiSchema(response.uiSchema);
        }
      }
    };

    return (
      <Box maw={400}>
        <FormBuilder
          key={formId}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmit}
          initialData={initialData}
          readonly={readonly}
        />
        {formResultUiSchema ? (
          <FormBuilder uiSchema={formResultUiSchema} />
        ) : null}
      </Box>
    );
  }
);
