import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { mantineTheme } from '~features/ui';
import { Providers } from './providers';

import 'normalize.css';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'allotment/dist/style.css';
import '@finch-cloud/common/dist/index.css';
import '@finch-cloud/form-builder/dist/index.css';
import '@finch-cloud/template-builder/dist/index.css';
import '@finch-cloud/react-renderer/dist/index.css';
import '@finch-cloud/ainch-ui/dist/index.css';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'FINCH Forms',
  description: '',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={roboto.className}>
        <MantineProvider theme={mantineTheme}>
          <Notifications position="top-right" />
          <Providers>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
