import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import omit from 'lodash/omit';

import {
  Textarea,
  Checkbox,
  TextInput,
  DatePicker,
  PasswordInput,
  Select,
} from '~features/ui';

const inputs = {
  text: TextInput,
  email: TextInput,
  number: TextInput,
  password: PasswordInput,
  textarea: Textarea,
  checkbox: Checkbox,
  date: DatePicker,
  select: Select,
} as const;

type inputTypes = keyof typeof inputs;

type InputTypesProps = {
  [P in inputTypes]: { type: P } & React.ComponentPropsWithoutRef<
    (typeof inputs)[P]
  >;
}[inputTypes];

export type FieldProps = {
  name: string;
  children?: React.ReactNode;
} & InputTypesProps;

export const Field = ({ name, ...props }: FieldProps) => {
  const { control } = useFormContext();

  if (props.type in inputs) {
    const { type, ...fieldProps } = props;
    const InputComponent = inputs[type] as React.FC<
      React.ComponentPropsWithoutRef<(typeof inputs)[typeof type]>
    >;

    return (
      <Controller
        name={name}
        render={({ field, fieldState }) => {
          const { error } = fieldState;

          return React.createElement(InputComponent, {
            ...fieldProps,
            ...omit(field, 'ref'),
            error: error?.message,
          });
        }}
        control={control}
      />
    );
  }

  return null;
};
