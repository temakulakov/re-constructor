import { JSONObject } from '@finch-cloud/common';
import { Id } from '~types';
import { draggableItems } from './constants';

export type CreatableDndItem = {
  type: typeof draggableItems.CREATABLE_ITEM;
  data: { name: string; itemProps?: JSONObject };
};

export type NodeDndItem = {
  type: typeof draggableItems.DRAGGABLE_ITEM;
  index?: number;
  id: Id;
  parentId: Id;
};
