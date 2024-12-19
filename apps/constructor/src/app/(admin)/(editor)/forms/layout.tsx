'use client';

import { Allotment } from 'allotment';

import { FormsTab } from '~features/forms/components/FormsTab';

type ProcessesLayoutProps = {
  children: React.ReactNode;
};

export default function ProcessesLayout({ children }: ProcessesLayoutProps) {
  return (
    <Allotment proportionalLayout={false}>
      <Allotment.Pane minSize={56} preferredSize="15%">
        <FormsTab />
      </Allotment.Pane>
      <Allotment.Pane preferredSize="85%">{children}</Allotment.Pane>
    </Allotment>
  );
}
