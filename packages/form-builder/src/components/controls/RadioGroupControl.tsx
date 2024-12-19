import { Group, Radio } from '@mantine/core';
import {
  and,
  ControlProps,
  isEnumControl,
  isOneOfEnumControl,
  optionIs,
  OwnPropsOfEnum,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import {
  withJsonFormsEnumProps,
  withJsonFormsOneOfEnumProps,
} from '@jsonforms/react';

type RadioGroupControlProps = ControlProps & OwnPropsOfEnum;

const _RadioGroupControl = ({
  options,
  label,
  required,
  description,
  enabled,
  data,
  errors,
  uischema: { options: { readOnly } = {} },
}: RadioGroupControlProps) => {
  if (!options) {
    return null;
  }

  return (
    <Radio.Group
      label={label}
      required={required}
      description={description}
      value={data}
      error={errors}
    >
      <Group mt="xs">
        {options.map((option) => (
          <Radio
            value={option.value}
            key={option.label}
            label={option.label}
            disabled={!enabled || readOnly}
          />
        ))}
      </Group>
    </Radio.Group>
  );
};

export const enumRadioGroupControlTester: RankedTester = rankWith(
  20,
  and(isEnumControl, optionIs('element', 'RadioGroup'))
);

export const EnumRadioGroupControl = withJsonFormsEnumProps(_RadioGroupControl);

export const oneOfRadioGroupControlTester: RankedTester = rankWith(
  20,
  and(isOneOfEnumControl, optionIs('element', 'RadioGroup'))
);

export const OneOfRadioGroupControl =
  withJsonFormsOneOfEnumProps(_RadioGroupControl);
