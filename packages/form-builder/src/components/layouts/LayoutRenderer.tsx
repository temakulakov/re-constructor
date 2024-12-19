import { memo } from 'react';
import { Flex } from '@mantine/core';
import isEmpty from 'lodash/isEmpty';
import {
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  OwnPropsOfRenderer,
} from '@jsonforms/core';
import type { UISchemaElement } from '@jsonforms/core';
import { JsonFormsDispatch } from '@jsonforms/react';

export const renderLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[]
) => {
  return elements.map((child, index) => (
    <Flex key={`${path}-${index}`} direction="column">
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </Flex>
  ));
};

export type LayoutRendererProps = OwnPropsOfRenderer & {
  elements: UISchemaElement[];
  direction: 'row' | 'column';
};

export const LayoutRenderer = memo(
  ({
    visible,
    elements,
    schema,
    path,
    enabled,
    direction,
    renderers,
    cells,
  }: LayoutRendererProps) => {
    if (isEmpty(elements)) {
      return null;
    }

    return (
      <Flex direction={direction} gap={direction === 'row' ? 2 : 10}>
        {renderLayoutElements(
          elements,
          schema,
          path,
          enabled,
          renderers,
          cells
        )}
      </Flex>
    );
  }
);
