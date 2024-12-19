import { Tabs } from '@mantine/core';
import { useRouter, usePathname } from 'next/navigation';

import { FilesIcon, ProcessIcon, FormIcon } from '@finch-cloud/common';
import { ColorSchemeSwitcher } from './ColorSchemeSwitcher';
import classes from './Sidebar.module.css';

type TabNames = 'forms' | 'processes' | 'templates';

const tabNames: Record<TabNames, TabNames> = {
  forms: 'forms',
  processes: 'processes',
  templates: 'templates',
  // settings: 'settings',
  // user: 'user',
} as const;

const getMatchedPathname = (pathname: string) =>
  Object.values(tabNames).find((name) => pathname.startsWith(`/${name}`)) ||
  tabNames.templates;

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const tabValue = getMatchedPathname(pathname);

  return (
    <div className={classes.wrapper}>
      <Tabs
        orientation="vertical"
        value={tabValue}
        onChange={(value) => {
          value && router.push(`/${value as TabNames}`);
        }}
        variant="pills"
        classNames={{
          panel: classes.panel,
          root: classes.root,
          list: classes.list,
          tab: classes.tab,
        }}
        keepMounted={false}
      >
        <Tabs.List>
          <Tabs.Tab
            value={tabNames.templates}
            leftSection={<FilesIcon size={24} />}
          />
          <Tabs.Tab
            value={tabNames.processes}
            leftSection={<ProcessIcon size={24} />}
          />
          <Tabs.Tab
            value={tabNames.forms}
            leftSection={<FormIcon size={24} />}
          />
          {/* <Tabs.Tab
            value={tabNames.settings}
            leftSection={<SettingsIcon size={24} />}
          />
          <Tabs.Tab
            value={tabNames.user}
            leftSection={<UserIcon size={24} />}
          /> */}
          <ColorSchemeSwitcher />
        </Tabs.List>
        {/* <Tabs.Panel value="search" pl="xs">
            Search
          </Tabs.Panel>
          <Tabs.Panel value="git">
            <SourceControlTab />
          </Tabs.Panel>
          <Tabs.Panel value="user" pl="xs">
            User
          </Tabs.Panel> */}
      </Tabs>
    </div>
  );
};
