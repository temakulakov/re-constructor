import merge from 'lodash/merge';
import map from 'lodash/map';
import range from 'lodash/range';
import { useState, useCallback } from 'react';
import {
  ArrayLayoutProps,
  composePaths,
  computeLabel,
  createDefaultValue,
  isObjectArrayWithNesting,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsArrayLayoutProps } from '@jsonforms/react';

import { ExpandPanelRenderer } from '../ExpandPanelRenderer';
import { ArrayLayoutToolbar } from './Toolbar';

export const ArrayLayout = (props: ArrayLayoutProps) => {
  const {
    enabled,
    data,
    path,
    schema,
    uischema,
    errors,
    addItem,
    renderers,
    cells,
    label,
    required = false,
    rootSchema,
    config,
    uischemas,
    translations,
  } = props;
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const innerCreateDefaultValue = useCallback(
    () => createDefaultValue(schema),
    [schema]
  );
  const handleChange = useCallback(
    (panel: string) => (expandedPanel: boolean) => {
      setExpanded(expandedPanel ? panel : false);
    },
    []
  );
  const isExpanded = (index: number) =>
    expanded === composePaths(path, `${index}`);
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <div>
      <ArrayLayoutToolbar
        translations={translations}
        label={computeLabel(
          label,
          required,
          appliedUiSchemaOptions.hideRequiredAsterisk
        )}
        errors={errors}
        path={path}
        enabled={enabled}
        addItem={addItem}
        createDefault={innerCreateDefaultValue}
      />
      <div>
        {data > 0 ? (
          map(range(data), (index) => {
            return (
              <ExpandPanelRenderer
                enabled={enabled}
                index={index}
                expanded={isExpanded(index)}
                schema={schema}
                path={path}
                handleExpansion={handleChange}
                uischema={uischema}
                renderers={renderers}
                cells={cells}
                key={index}
                rootSchema={rootSchema}
                enableMoveUp={index !== 0}
                enableMoveDown={index < data - 1}
                config={config}
                childLabelProp={appliedUiSchemaOptions.elementLabelProp}
                uischemas={uischemas}
                translations={translations}
              />
            );
          })
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export const _ArrayLayoutRenderer = ({
  visible,
  addItem,
  ...props
}: ArrayLayoutProps) => {
  const addItemCb = useCallback(
    (p: string, value: unknown) => addItem(p, value),
    [addItem]
  );

  return <ArrayLayout visible={visible} addItem={addItemCb} {...props} />;
};

export const ArrayLayoutRenderer =
  withJsonFormsArrayLayoutProps(_ArrayLayoutRenderer);

export const arrayLayoutTester: RankedTester = rankWith(
  4,
  isObjectArrayWithNesting
);
