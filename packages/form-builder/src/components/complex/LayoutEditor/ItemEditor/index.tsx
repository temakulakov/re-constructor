import { ArrayControlProps, composePaths, findUISchema } from '@jsonforms/core';
import { JsonFormsDispatch } from '@jsonforms/react';
import { Text } from '@mantine/core';
import { useMemo } from 'react';

import classes from './ItemEditor.module.css';

type ItemEditorProps = ArrayControlProps & { selectedIndex: number | null };

export const ItemEditor = ({
  selectedIndex,
  path,
  uischemas,
  uischema,
  schema,
  rootSchema,
  renderers,
  cells,
}: ItemEditorProps) => {
  const childPath = composePaths(path, `${selectedIndex}`);

  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema
      ),
    [uischemas, schema, path, uischema, rootSchema]
  );

  return (
    <div className={classes.wrapper}>
      {typeof selectedIndex === 'number' ? (
        <JsonFormsDispatch
          schema={schema}
          uischema={foundUISchema}
          path={childPath}
          key={childPath}
          renderers={renderers}
          cells={cells}
        />
      ) : (
        <div className={classes.placeholder}>
          <Text>Select an element to edit its&nbsp;options</Text>
        </div>
      )}
    </div>
  );
};
