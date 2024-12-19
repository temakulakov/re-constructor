import { JSONValue } from '@finch-cloud/common';
import { draggableItems } from './constants';

export type DndItem = {
  type: keyof typeof draggableItems;
  index?: number;
  data: JSONValue;
};
