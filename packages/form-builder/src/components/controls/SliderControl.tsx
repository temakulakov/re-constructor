import { useCallback } from 'react';
import {
  and,
  ControlProps,
  isRangeControl,
  optionIs,
  or,
  RankedTester,
  rankWith,
  schemaMatches,
  schemaTypeIs,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, Slider, Text } from '@mantine/core';

export const _SliderControl = (props: ControlProps) => {
  const {
    id,
    data,
    description,
    enabled,
    errors,
    label,
    schema,
    handleChange,
    visible,
    path,
    required,
    config,
    uischema: { options: { readOnly } = {} },
  } = props;

  const onChange = useCallback(
    (value: number) => handleChange(path, Number(value)),
    [path, handleChange]
  );

  return (
    <Box>
      <Text variant="caption" htmlFor={id} component="label">
        {label}
      </Text>
      <Slider
        mt={4}
        min={schema.minimum}
        max={schema.maximum}
        value={Number(data || schema.default)}
        onChange={onChange}
        id={`${id}-input`}
        disabled={!enabled || readOnly}
        step={schema.multipleOf || 1}
      />
    </Box>
  );
};

const isSliderControl = and(
  uiTypeIs('Control'),
  or(schemaTypeIs('number'), schemaTypeIs('integer')),
  schemaMatches(
    (schema) =>
      Object.prototype.hasOwnProperty.call(schema, 'maximum') &&
      Object.prototype.hasOwnProperty.call(schema, 'minimum')
    // Object.prototype.hasOwnProperty.call(schema, 'default')
  ),
  optionIs('element', 'Slider')
);

export const sliderControlTester: RankedTester = rankWith(5, isSliderControl);

export const SliderControl = withJsonFormsControlProps(_SliderControl);
