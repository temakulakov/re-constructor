'use client';

import { IframeBus } from '@finch-cloud/common';
import { LayoutZone } from '@finch-cloud/template-builder';
import { useEffect } from 'react';
import { ApiProvider } from '~features/api';

export default function PreviewPage() {
  useEffect(() => {
    IframeBus.sendToConstructor('INIT_TEMPLATE', {});
  });

  return (
    <ApiProvider>
      <main>
        <div>
          <LayoutZone />
        </div>
      </main>
    </ApiProvider>
  );
}
