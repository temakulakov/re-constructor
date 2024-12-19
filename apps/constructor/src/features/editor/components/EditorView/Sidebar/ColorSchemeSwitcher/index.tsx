import { DarkThemeIcon, LightThemeIcon } from '@finch-cloud/common';
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';

import classes from './ColorSchemeSwitcher.module.css';

export const ColorSchemeSwitcher = () => {
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const { setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      style={{
        padding: '10px',
        width: 'auto',
        height: '44px',
        color: 'var(--_tab-color)',
        marginTop: 'auto',
      }}
      onClick={toggleColorScheme}
    >
      <DarkThemeIcon className={classes.dark} size={24} />
      <LightThemeIcon className={classes.light} size={24} />
    </ActionIcon>
  );
};
