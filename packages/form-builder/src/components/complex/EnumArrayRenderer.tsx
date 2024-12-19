import {
  and,
  ControlProps,
  DispatchPropsOfMultiEnumControl,
  hasType,
  JsonSchema,
  OwnPropsOfEnum,
  RankedTester,
  rankWith,
  schemaMatches,
  schemaSubPathMatches,
  uiTypeIs,
} from '@jsonforms/core';
import { withJsonFormsMultiEnumProps } from '@jsonforms/react';
import { MultiSelect } from '@mantine/core';
import merge from 'lodash/merge';

type EnumArrayRendererProps = ControlProps &
  OwnPropsOfEnum &
  DispatchPropsOfMultiEnumControl;

const _EnumArrayRenderer = ({
  uischema,
  config,
  errors,
  path,
  options,
  data,
  label,
  handleChange,
}: EnumArrayRendererProps) => {
  const onChange = (value: string[]) => {
    handleChange(path, value);
  };
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <MultiSelect
      value={data}
      onChange={onChange}
      label={label}
      data={options}
      error={errors}
      searchable={Boolean(appliedUiSchemaOptions.autocomplete)}
    />
  );
};

const hasOneOfItems = (schema: JsonSchema): boolean =>
  schema.oneOf !== undefined &&
  schema.oneOf.length > 0 &&
  (schema.oneOf as JsonSchema[]).every((entry: JsonSchema) => {
    return entry.const !== undefined;
  });

const hasEnumItems = (schema: JsonSchema): boolean =>
  schema.type === 'string' && schema.enum !== undefined;

export const enumArrayRendererTester: RankedTester = rankWith(
  5,
  and(
    uiTypeIs('Control'),
    and(
      schemaMatches(
        (schema) =>
          hasType(schema, 'array') &&
          !Array.isArray(schema.items) &&
          schema.uniqueItems === true
      ),
      schemaSubPathMatches('items', (schema) => {
        return hasOneOfItems(schema) || hasEnumItems(schema);
      })
    )
  )
);

export const EnumArrayRenderer =
  withJsonFormsMultiEnumProps(_EnumArrayRenderer);
