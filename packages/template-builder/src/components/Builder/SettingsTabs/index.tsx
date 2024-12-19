'use client';

import { Tabs } from '@mantine/core';

import { useBuilderStore } from '~model/builderSlice';
import { TabNames, tabNames } from '~constants/tabs';
import { CreatableItems } from '../CreateableItems';
import { TemplateSettings } from '../TemplateSettings';
import { ItemEditor } from '../ItemEditor';
import classes from './SettingsTabs.module.css';

export const SettingsTabs = () => {
  const { selectedTab, setSelectedTab } = useBuilderStore();

  return (
    <Tabs
      variant="pills"
      radius="xs"
      classNames={{
        panel: classes.panel,
        root: classes.wrapper,
        tab: classes.tab,
      }}
      value={selectedTab}
      onChange={(value) => {
        setSelectedTab(value as TabNames);
      }}
    >
      <Tabs.List>
        <Tabs.Tab value={tabNames.templateSettings}>Template</Tabs.Tab>
        <Tabs.Tab value={tabNames.itemSettings}>Inspect</Tabs.Tab>
        <Tabs.Tab value={tabNames.createableItems}>Create</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value={tabNames.templateSettings}>
        <TemplateSettings />
      </Tabs.Panel>
      <Tabs.Panel
        value={tabNames.itemSettings}
        className={classes.panel_editor}
      >
        <ItemEditor />
      </Tabs.Panel>
      <Tabs.Panel
        value={tabNames.createableItems}
        className={classes.panel_editor}
      >
        <CreatableItems />
      </Tabs.Panel>
    </Tabs>
  );
};
