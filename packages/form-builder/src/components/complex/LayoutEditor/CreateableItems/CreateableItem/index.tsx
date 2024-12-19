import { Card, Stack, Text } from '@mantine/core';
import { useDrag } from 'react-dnd';

import {
  componentConfigs,
  componentNames,
  draggableItems,
} from '../../constants';
import classes from './CreatableItem.module.css';

type CreateableItemProps = {
  type: keyof typeof componentNames;
};

export const CreateableItem = ({ type }: CreateableItemProps) => {
  const [, drag] = useDrag({
    type: draggableItems.CREATABLE_ITEM,
    item: {
      type: draggableItems.CREATABLE_ITEM,
      data: {
        field: {
          type,
          name: '',
        },
      },
    },
  });

  const config = componentConfigs[type];
  const Icon = config.icon;

  return (
    <Card
      className={classes.wrapper}
      ref={drag}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <div className={classes['icon-wrapper']}>
        <Icon />
      </div>
      <Text mt="auto" size="xs">
        {type}
      </Text>
    </Card>
  );
};
