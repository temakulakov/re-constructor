'use client';

import { Allotment } from 'allotment';

import { TemplatesTab } from '~features/templates/components/TemplatesTab';

type TemplatesLayoutProps = {
  children: React.ReactNode;
};

export default function TemplatesLayout({ children }: TemplatesLayoutProps) {
  return (
    <Allotment proportionalLayout={false}>
      <Allotment.Pane minSize={56} preferredSize="15%">
        <TemplatesTab />
      </Allotment.Pane>
      <Allotment.Pane preferredSize="85%">{children}</Allotment.Pane>
    </Allotment>
  );
}
