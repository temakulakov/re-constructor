import { useLayoutEffect } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import {
  and,
  RankedTester,
  rankWith,
  schemaMatches,
  uiTypeIs,
} from '@jsonforms/core';

export const ConstControl = withJsonFormsControlProps(
  ({ schema, handleChange, path }) => {
    useLayoutEffect(() => {
      handleChange(path, schema.const);
    }, [schema, path, handleChange]);

    return null;
  }
);

export const isConstControl = and(
  uiTypeIs('Control'),
  schemaMatches((schema) => {
    return Object.prototype.hasOwnProperty.call(schema, 'const');
  })
);

export const constControlTester: RankedTester = rankWith(10, isConstControl);
