import React, { useCallback, useMemo } from 'react';
import { Control } from 'react-hook-form';
import debounce from 'lodash/debounce';
import {
  Checkbox,
  NumberInput,
  RadioGroup,
  Slider,
  Textarea,
  TextInput,
  ColorInput,
} from 'react-hook-form-mantine';
import { useShallow } from 'zustand/react/shallow';

import { useBuilderStore } from '~model/builderSlice';
import { Select } from '~components/Select';
import { ExpressionInput } from './ExpressionInput';
import { Label } from './Label';

const inputs = {
  TEXT_INPUT: { renderer: TextInput },
  EMAIL_INPUT: { renderer: TextInput },
  NUMBER_INPUT: { renderer: NumberInput },
  EXPRESSION_INPUT: { renderer: ExpressionInput },
  TEXTAREA: { renderer: Textarea },
  CHECKBOX: { renderer: Checkbox },
  COLOR: { renderer: ColorInput },
  SLIDER: { renderer: Slider },
  SELECT: {
    renderer: Select,
    defaultProps: { allowDeselect: false },
  },
} as const;

type inputTypes = keyof typeof inputs;

type InputTypesProps = {
  [P in inputTypes]: { type: P } & React.ComponentPropsWithoutRef<
    (typeof inputs)[P]['renderer']
  >;
}[inputTypes];

export type FieldProps = {
  name: string;
  control: Control;
} & InputTypesProps;

export const Field = ({
  name,
  label,
  schema,
  control,
  ...props
}: FieldProps) => {
  const { selectedId, setNodeData, setIsNodePropDynamic } = useBuilderStore();
  const isDynamic = useBuilderStore(
    useShallow((state) =>
      typeof selectedId === 'number'
        ? Boolean(state.nodesById[selectedId].dynamicProps?.[name])
        : false
    )
  );

  const toggleIsDynamic = useCallback(() => {
    setIsNodePropDynamic({
      id: selectedId!,
      isDynamic: !isDynamic,
      propName: name,
    });
  }, [isDynamic, selectedId, name, setIsNodePropDynamic]);

  const labelWithExpression = useMemo(
    () => <Label label={label} onExpressionToggleClick={toggleIsDynamic} />,
    [label, toggleIsDynamic]
  );

  if (props.type in inputs) {
    const { type, ...fieldProps } = props;
    const InputComponent = inputs[type].renderer as React.FC<
      React.ComponentPropsWithoutRef<(typeof inputs)[typeof type]['renderer']>
    >;

    const onChange = debounce((eventOrValue) => {
      const value = eventOrValue?.target
        ? eventOrValue.target.value
        : eventOrValue;

      if (selectedId !== null) {
        setNodeData({ id: selectedId, data: value, property: name });
      }
    }, 500);

    if (isDynamic) {
      return (
        <ExpressionInput
          name={name}
          label={labelWithExpression}
          control={control}
          onChange={onChange}
          schema={schema}
          {...fieldProps}
        />
      );
    }

    return (
      <InputComponent
        name={name}
        label={labelWithExpression}
        control={control}
        onChange={onChange}
        schema={schema}
        {...fieldProps}
      />
    );
  }

  return null;
};
