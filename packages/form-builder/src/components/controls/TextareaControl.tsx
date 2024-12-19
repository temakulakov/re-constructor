import { ChangeEvent } from 'react';
import {
  and,
  ControlProps,
  optionIs,
  or,
  RankedTester,
  rankWith,
  schemaMatches,
  schemaTypeIs,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Textarea } from '@mantine/core';

const _Textarea = ({
  required,
  label,
  errors,
  handleChange,
  data = '',
  path,
  uischema: { options: { placeholder, readOnly } = {} },
  enabled,
}: ControlProps) => {
  const onChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(path, ev.target.value);
  };

  return (
    <Textarea
      label={label}
      error={errors}
      value={data}
      onChange={onChange}
      required={required}
      placeholder={placeholder || label}
      disabled={readOnly || !enabled}
    />
  );
};

export const isTextareaControl = and(
  uiTypeIs('Control'),
  schemaTypeIs('string'),
  or(
    optionIs('element', 'Textarea'),
    schemaMatches((schema) => {
      return (
        Object.prototype.hasOwnProperty.call(schema, 'format') &&
        schema.format === 'textarea'
      );
    })
  )
);

export const TextareaControl = withJsonFormsControlProps(_Textarea);

export const textareaControlTester: RankedTester = rankWith(
  8,
  isTextareaControl
);
