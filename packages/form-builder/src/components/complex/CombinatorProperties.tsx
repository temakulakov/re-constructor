import { Generate, JsonSchema, isLayout } from '@jsonforms/core';
import { JsonFormsDispatch } from '@jsonforms/react';
import omit from 'lodash/omit';

interface CombinatorPropertiesProps {
  schema: JsonSchema;
  combinatorKeyword: 'oneOf' | 'anyOf';
  path: string;
}

export const CombinatorProperties = ({
  schema,
  combinatorKeyword,
  path,
}: CombinatorPropertiesProps) => {
  const otherProps = omit(schema, combinatorKeyword) as JsonSchema;
  const foundUISchema = Generate.uiSchema(otherProps, 'VerticalLayout');
  let isLayoutWithElements = false;

  if (foundUISchema !== null && isLayout(foundUISchema)) {
    isLayoutWithElements = foundUISchema.elements.length > 0;
  }

  if (isLayoutWithElements) {
    return (
      <JsonFormsDispatch
        schema={otherProps}
        path={path}
        uischema={foundUISchema}
      />
    );
  }

  return null;
};
