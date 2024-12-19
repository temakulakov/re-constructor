import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Accordion, Text } from '@mantine/core';

import { widgets } from '@finch-cloud/react-renderer';
import { getTemplates } from '~model/services';
import { useBuilderStore } from '~model/builderSlice';
import { CreateableItem } from './CreateableItem';
import classes from './CreatableItems.module.css';

const getNameFromPath = (path: string) => path.split('/').pop();

export const Templates = () => {
  const { data } = useQuery({
    queryKey: ['fieldData', name],
    queryFn: () => getTemplates({ limit: 100 }),
  });
  const { currentTemplateId } = useBuilderStore();

  const templates = useMemo(() => {
    if (data) {
      return data
        ?.filter(
          (item) =>
            item.id !== currentTemplateId && !item.name.startsWith('/pages')
        )
        .map((item) => {
          return {
            value: item.id,
            label: getNameFromPath(item.name),
          };
        }) as { value: string; label: string }[];
    }

    return [];
  }, [data]);

  return (
    <Accordion.Item value="templates">
      <div className={classes.group}>
        <Accordion.Control>Templates</Accordion.Control>
        <Accordion.Panel>
          <div className={classes.group__grid}>
            {templates.map((template) => (
              <CreateableItem
                key={template.label}
                name={widgets.TEMPLATE.config.name}
                label={template.label}
                itemProps={{ templateId: template.value }}
              />
            ))}
          </div>
        </Accordion.Panel>
      </div>
    </Accordion.Item>
  );
};
