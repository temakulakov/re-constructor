import { useMemo } from 'react';
import { Text } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow';
import { z } from 'zod';

import { widgets } from '../constants';
import { useBuilderStore } from '~model/builderSlice';
import classes from './ItemEditor.module.css';
import { PropsForm } from './PropsForm';
import { useTemplateInputs } from './useTemplateInputs';

export const ItemEditor = () => {
  const { selectedId } = useBuilderStore();
  const node = useBuilderStore(
    useShallow((state) =>
      typeof selectedId === 'number' ? state.nodesById[selectedId] : null
    )
  );

  const templateInputs = useTemplateInputs({
    templateId: (node?.data?.templateId as string) ?? null,
  });

  const propsConfig = useMemo(
    () =>
      node ? { ...widgets[node.name].propsConfig, ...templateInputs } : null,
    [node, templateInputs]
  );

  const config = useMemo(
    () => (node ? widgets[node.name].config : null),
    [node]
  );

  const validationSchema = useMemo(() => {
    if (propsConfig) {
      const schemaObject = Object.values(propsConfig).reduce<
        Record<string, z.ZodTypeAny>
      >((acc, group) => {
        group.children.forEach((child) => {
          acc[child.name] = child.validationSchema;
        });

        return acc;
      }, {});

      return z.object(schemaObject);
    }
    return null;
  }, [propsConfig]);

  const initialData = useMemo(() => (node ? node?.data : null), [node]);
  const Icon = config?.icon;

  return propsConfig && validationSchema ? (
    <>
      <div className={classes.title}>
        <Text>{config?.label}</Text>
        {Icon ? (
          <div className={classes.icon}>
            <Icon />
          </div>
        ) : null}
      </div>
      <PropsForm
        key={node?.id}
        initialData={initialData}
        config={propsConfig}
        validationSchema={validationSchema}
      />
    </>
  ) : (
    <div className={classes.placeholder}>
      <Text>Select an element to edit its&nbsp;options</Text>
    </div>
  );
};
