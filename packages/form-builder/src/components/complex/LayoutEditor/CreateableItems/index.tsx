import { memo } from 'react';
import { Text } from '@mantine/core';

import { componentGroups } from '../constants';
import { CreateableItem } from './CreateableItem';
import classes from './CreatableItems.module.css';

export const CreatableItems = memo(() => {
  return (
    <div className={classes.wrapper}>
      {Object.values(componentGroups).map((group) => (
        <div className={classes.group} key={group.name}>
          <Text>{group.name}</Text>
          <div key={group.name} className={classes.group__grid}>
            {group.components.map((component) => (
              <CreateableItem key={component} type={component} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
