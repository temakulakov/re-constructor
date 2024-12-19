import React from 'react';
import {
  CheckboxIcon,
  DateInputIcon,
  NumberInputIcon,
  RadioGroupIcon,
  SelectIcon,
  SliderIcon,
  TextareaIcon,
  TextInputIcon,
} from './icons/form';
import { FileInputIcon } from './icons/form/FileInput';

export const draggableItems = {
  CREATABLE_ITEM: 'CREATABLE_ITEM',
  DRAGGABLE_ITEM: 'DRAGGABLE_ITEM',
} as const;

export const componentNames = {
  TextInput: 'TextInput',
  NumberInput: 'NumberInput',
  Slider: 'Slider',
  Checkbox: 'Checkbox',
  DateInput: 'DateInput',
  FileInput: 'FileInput',
  Textarea: 'Textarea',
  Select: 'Select',
  RadioGroup: 'RadioGroup',
} as const;

export const componentGroupNames = {
  form: 'form',
  layout: 'layout',
} as const;

export const componentGroups = {
  [componentGroupNames.form]: {
    name: 'Form fields',
    components: [
      componentNames.TextInput,
      componentNames.NumberInput,
      componentNames.Checkbox,
      componentNames.DateInput,
      componentNames.FileInput,
      componentNames.RadioGroup,
      componentNames.Select,
      componentNames.Slider,
      componentNames.Textarea,
    ],
  },
};

type ComponentConfig = {
  icon: React.ComponentType;
};

export const componentConfigs: Record<
  keyof typeof componentNames,
  ComponentConfig
> = {
  [componentNames.TextInput]: { icon: TextInputIcon },
  [componentNames.NumberInput]: { icon: NumberInputIcon },
  [componentNames.Checkbox]: { icon: CheckboxIcon },
  [componentNames.DateInput]: { icon: DateInputIcon },
  [componentNames.FileInput]: { icon: FileInputIcon },
  [componentNames.RadioGroup]: { icon: RadioGroupIcon },
  [componentNames.Select]: { icon: SelectIcon },
  [componentNames.Slider]: { icon: SliderIcon },
  [componentNames.Textarea]: { icon: TextareaIcon },
};
