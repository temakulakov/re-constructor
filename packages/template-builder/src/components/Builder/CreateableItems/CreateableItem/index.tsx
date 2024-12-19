import { Card, Text } from '@mantine/core';
import { useDrag } from 'react-dnd';

import { JSONObject } from '@finch-cloud/common';
import { draggableItems } from '../../constants';
import classes from './CreatableItem.module.css';

type CreateableItemProps = {
  name: string;
  label: string;
  icon?: React.ComponentType;
  itemProps?: JSONObject;
};

export const CreateableItem = ({
  name,
  icon,
  label,
  itemProps,
}: CreateableItemProps) => {
  const [, drag] = useDrag({
    type: draggableItems.CREATABLE_ITEM,
    item: {
      type: draggableItems.CREATABLE_ITEM,
      data: {
        name,
        itemProps,
      },
    },
  });

  const Icon = icon;

  return (
    <Card
      className={classes.wrapper}
      ref={drag}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      {Icon && (
        <div className={classes['icon-wrapper']}>
          <Icon />
        </div>
      )}
      <Text className={classes['text']} size="xs">
        {label}
      </Text>
    </Card>
  );
};
