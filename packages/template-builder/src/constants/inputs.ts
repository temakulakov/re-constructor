import {
  Checkbox,
  NumberInput,
  RadioGroup,
  Slider,
  Textarea,
  TextInput,
  ColorInput,
} from 'react-hook-form-mantine';

import { Select } from '~components/Select';

export const inputNames = {
  TEXT_INPUT: 'TEXT_INPUT',
  EMAIL_INPUT: 'EMAIL_INPUT',
  NUMBER_INPUT: 'NUMBER_INPUT',
  TEXTAREA: 'TEXTAREA',
  COLOR: 'COLOR',
  SLIDER: 'SLIDER',
  SELECT: 'SELECT',
  CHECKBOX: 'CHECKBOX',
} as const;

export const inputs = {
  [inputNames.TEXT_INPUT]: {
    renderer: TextInput,
    type: 'string',
    defaultValue: '',
  },
  [inputNames.EMAIL_INPUT]: {
    renderer: TextInput,
    type: 'string',
    defaultValue: '',
  },
  [inputNames.NUMBER_INPUT]: {
    renderer: NumberInput,
    type: 'number',
    defaultValue: 0,
  },
  [inputNames.TEXTAREA]: {
    renderer: Textarea,
    type: 'string',
    defaultValue: '',
  },
  [inputNames.CHECKBOX]: {
    renderer: Checkbox,
    type: 'boolean',
    defaultValue: true,
  },
  [inputNames.COLOR]: {
    renderer: ColorInput,
    type: 'string',
    defaultValue: '',
  },
  [inputNames.SLIDER]: { renderer: Slider, type: 'number', defaultValue: 0 },
  [inputNames.SELECT]: {
    renderer: Select,
    type: 'string',
    defaultProps: { allowDeselect: false },
    defaultValue: null,
  },
} as const;
