import { ChangeEvent } from 'react';
import {
  ControlProps,
  isStringControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { TextInput } from '@mantine/core';

const _TextControl = ({
  required,
  label,
  errors,
  handleChange,
  data = '',
  path,
  enabled,
  uischema: { options: { placeholder, readOnly } = {} },
}: ControlProps) => {
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    handleChange(path, value === '' ? undefined : value);
  };

  return (
    <TextInput
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

export const TextControl = withJsonFormsControlProps(_TextControl);

export const textControlTester: RankedTester = rankWith(1, isStringControl);
