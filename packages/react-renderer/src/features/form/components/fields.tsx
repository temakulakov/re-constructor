import React from 'react';
import { Control, useFormContext } from 'react-hook-form';
import {
  Checkbox as _Checkbox,
  NumberInput as _NumberInput,
  RadioGroup as _RadioGroup,
  Select as _Select,
  Slider as _Slider,
  Textarea as _Textarea,
  TextInput as _TextInput,
} from 'react-hook-form-mantine';

export const withControl = <P extends object>(
  Component: React.ComponentType<P & { control: Control }>
) => {
  const HOC = React.forwardRef<unknown, React.PropsWithChildren<P>>(
    ({ children, ...props }, ref) => {
      const { control } = useFormContext();

      return (
        <Component {...props} ref={ref} control={control}>
          {children}
        </Component>
      );
    }
  );

  return HOC;
};

export const Checkbox = withControl(_Checkbox);
export const NumberInput = withControl(_NumberInput);
export const RadioGroup = withControl(_RadioGroup);
export const Select = withControl(_Select);
export const Textarea = withControl(_Textarea);
export const TextInput = withControl(_TextInput);
export const Slider = withControl(_Slider);
