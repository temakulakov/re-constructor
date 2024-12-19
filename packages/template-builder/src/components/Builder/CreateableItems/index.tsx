import { memo } from 'react';
import { ScrollArea, Accordion } from '@mantine/core';

import { componentGroups } from '../constants';
import { CreateableItem } from './CreateableItem';
import { Templates } from './Templates';
import classes from './CreatableItems.module.css';

export const CreatableItems = memo(() => {
  return (
    <ScrollArea className={classes.wrapper}>
      <Accordion defaultValue="templates">
        <Templates />
        {Object.values(componentGroups).map((group) => (
          <Accordion.Item key={group.name} value={group.name}>
            <div className={classes.group}>
              <Accordion.Control>{group.name}</Accordion.Control>
              <Accordion.Panel>
                <div key={group.name} className={classes.group__grid}>
                  {group.components.map((component) => (
                    <CreateableItem
                      key={component.config.name}
                      name={component.config.name}
                      icon={component.config.icon}
                      label={component.config.label || component.config.name}
                      itemProps={component.config.defaultProps}
                    />
                  ))}
                </div>
              </Accordion.Panel>
            </div>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScrollArea>
  );
});
