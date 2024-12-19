import { useMemo } from 'react';
import { Select } from '@mantine/core';
import {
  and,
  ControlProps,
  isEnumControl,
  isOneOfEnumControl,
  optionIs,
  or,
  OwnPropsOfEnum,
  RankedTester,
  rankWith,
  schemaMatches,
  uiTypeIs,
} from '@jsonforms/core';
import { useQuery } from '@tanstack/react-query';
import {
  TranslateProps,
  withJsonFormsEnumProps,
  withJsonFormsOneOfEnumProps,
  withTranslateProps,
} from '@jsonforms/react';
import merge from 'lodash/merge';

import { getJsonData } from '~model/services';

type SelectControlProps = ControlProps & OwnPropsOfEnum & TranslateProps;

export const ManualSelect = ({
  config,
  uischema,
  errors,
  label,
  required,
  options = [],
  handleChange,
  path,
  data,
  enabled,
}: SelectControlProps) => {
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const onChange = (val: string | null) => {
    handleChange(path, val);
  };

  return (
    <Select
      checkIconPosition="right"
      label={label}
      required={required}
      data={options}
      error={errors}
      onChange={onChange}
      searchable={Boolean(appliedUiSchemaOptions.autocomplete)}
      disabled={Boolean(appliedUiSchemaOptions.readOnly) || !enabled}
    />
  );
};

export const MappedSelect = ({
  config,
  uischema,
  errors,
  label,
  required,
  handleChange,
  path,
  data: value,
  enabled,
}: SelectControlProps) => {
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const { data } = useQuery({
    queryKey: ['fieldData', path],
    queryFn: () => getJsonData({ url: appliedUiSchemaOptions.url }),
    enabled: !!appliedUiSchemaOptions.url,
  });

  const options = useMemo(() => {
    if (data) {
      return data?.map((item) => {
        return {
          value: item.value || item.id,
          label: item.label || item.value || item.name,
        };
      }) as { value: string; label: string }[];
    }

    return [];
  }, [data]);

  const onChange = (val: string | null) => {
    handleChange(path, val);
  };

  return (
    <Select
      checkIconPosition="right"
      label={label}
      required={required}
      data={options}
      error={errors}
      onChange={onChange}
      value={value}
      searchable={Boolean(appliedUiSchemaOptions.autocomplete)}
      disabled={Boolean(appliedUiSchemaOptions.readOnly) || !enabled}
    />
  );
};

const _SelectControl = (props: SelectControlProps) => {
  if (props.uischema.options?.mode) {
    const { mode } = props.uischema.options;

    if (mode === 'mapped') {
      return <MappedSelect {...props} />;
    }

    if (mode === 'manual') {
      return <ManualSelect {...props} />;
    }
  }

  return <ManualSelect {...props} />;
};

export const enumSelectControlTester: RankedTester = rankWith(
  20,
  and(
    uiTypeIs('Control'),
    or(
      and(
        schemaMatches((schema) =>
          Object.prototype.hasOwnProperty.call(schema, 'enum')
        ),
        optionIs('element', 'Select')
      ),
      and(optionIs('element', 'Select'), optionIs('mode', 'mapped'))
    )
  )
);

export const EnumSelectControl = withJsonFormsEnumProps(
  withTranslateProps(_SelectControl),
  false
);

export const oneOfSelectControlTester: RankedTester = rankWith(
  5,
  and(isOneOfEnumControl, optionIs('element', 'Select'))
);

// HOC order can be reversed with https://github.com/eclipsesource/jsonforms/issues/1987
export const OneOfSelectControl = withJsonFormsOneOfEnumProps(
  withTranslateProps(_SelectControl),
  false
);
