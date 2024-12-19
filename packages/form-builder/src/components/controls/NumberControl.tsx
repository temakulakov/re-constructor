import {
  ControlProps,
  isNumberControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

import { NumberInput } from '@mantine/core';

export const NumberControl = withJsonFormsControlProps(
  ({
    required,
    label,
    errors,
    handleChange,
    data,
    path,
    enabled,
    uischema: { options: { placeholder, readOnly } = {} },
  }: ControlProps) => {
    const onChange = (value: string) => {
      handleChange(path, value === '' ? undefined : parseFloat(value));
    };

    return (
      <NumberInput
        label={label}
        error={errors}
        value={data}
        onChange={onChange}
        required={required}
        placeholder={placeholder || label}
        disabled={readOnly || !enabled}
      />
    );
  }
);

export const numberControlTester: RankedTester = rankWith(2, isNumberControl);
