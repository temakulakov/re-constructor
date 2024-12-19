import { useCallback } from 'react';
import dayjs from 'dayjs';
import { DateInput, DateValue } from '@mantine/dates';
import merge from 'lodash/merge';
import {
  ControlProps,
  isDateControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';

export const _DateControl = (props: ControlProps) => {
  const {
    description,
    id,
    errors,
    label,
    uischema,
    visible,
    enabled,
    required,
    path,
    handleChange,
    data,
    config,
    uischema: { options: { placeholder, readOnly } = {} },
  } = props;
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const format = appliedUiSchemaOptions.dateFormat ?? 'YYYY-MM-DD';

  const onChange = useCallback(
    (val: DateValue) => {
      handleChange(path, dayjs(val).format(format));
    },
    [handleChange, path, format]
  );

  const value = data ? dayjs(data, format).toDate() : null;

  return (
    <DateInput
      value={value ? new Date(value) : null}
      onChange={onChange}
      label={label}
      placeholder={placeholder || label}
      valueFormat="DD.MM.YYYY"
      required={required}
      description={description}
      error={!isValid ? errors : null}
      readOnly={readOnly || !enabled}
    />
  );
};

export const dateControlTester: RankedTester = rankWith(4, isDateControl);

export const DateControl = withJsonFormsControlProps(_DateControl);
