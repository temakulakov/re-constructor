import { createTheme } from '@mantine/core';

export const mantineTheme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'Roboto Mono, monospace',
  headings: { fontFamily: 'Roboto, sans-serif' },
  components: {
    ActionIcon: { defaultProps: { variant: 'subtle', color: 'gray' } },
    Button: {
      styles: {
        root: {
          fontWeight: 400,
        },
      },
    },
  },
});
