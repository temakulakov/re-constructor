export type TabNames = 'templateSettings' | 'itemSettings' | 'createableItems';

export const tabNames: Record<TabNames, TabNames> = {
  templateSettings: 'templateSettings',
  itemSettings: 'itemSettings',
  createableItems: 'createableItems',
} as const;
