import { Input } from '@mantine/core';
import { Control, useController } from 'react-hook-form';
import { memo, useMemo } from 'react';
import {
  ZodArray,
  ZodBoolean,
  ZodNumber,
  ZodObject,
  ZodSchema,
  ZodString,
  ZodUndefined,
} from 'zod';

import {
  ExpressionBuilder,
  VALIDATION_TYPES,
} from '~features/expression-builder';

type ExpressionInputProps = {
  control: Control;
  name: string;
  label: React.ReactNode;
  required?: boolean;
  onChange: (val: string) => void;
  schema: ZodSchema;
};

export const ExpressionInput = memo(function ExpressionInput({
  name,
  label,
  control,
  onChange,
  required = false,
  schema,
}: ExpressionInputProps) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController({
    name,
    control,
  });

  const expectedType = useMemo(() => {
    if (schema instanceof ZodString) {
      return VALIDATION_TYPES.STRING;
    }

    if (schema instanceof ZodBoolean) {
      return VALIDATION_TYPES.STRING;
    }

    if (schema instanceof ZodNumber) {
      return VALIDATION_TYPES.NUMBER;
    }

    if (schema instanceof ZodArray) {
      return VALIDATION_TYPES.ARRAY;
    }

    if (schema instanceof ZodObject) {
      return VALIDATION_TYPES.OBJECT;
    }

    if (schema instanceof ZodUndefined) {
      return VALIDATION_TYPES.UNDEFINED;
    }

    if (schema instanceof ZodArray) {
      return VALIDATION_TYPES.ANY;
    }
  }, [schema]);

  const handleChange = (newValue: string) => {
    try {
      fieldOnChange(newValue);
      onChange(newValue);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Input.Wrapper label={label} required={required}>
      <ExpressionBuilder
        value={value}
        {...field}
        onChange={handleChange}
        expectValueType={expectedType}
      />
    </Input.Wrapper>
  );
});
