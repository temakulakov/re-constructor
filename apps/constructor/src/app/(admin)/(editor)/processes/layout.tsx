'use client';

import { Allotment } from 'allotment';
import dynamic from 'next/dynamic';

// import { ProcessTab } from '~features/processes/components/ProcessTab';

type ProcessesLayoutProps = {
  children: React.ReactNode;
};

const ProcessTabDynamic = dynamic(
  () =>
    import('~features/processes/components/ProcessTab').then(
      (m) => m.ProcessTab
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function ProcessesLayout({ children }: ProcessesLayoutProps) {
  return (
    <Allotment proportionalLayout={false}>
      <Allotment.Pane minSize={56} preferredSize="15%">
        <ProcessTabDynamic />
      </Allotment.Pane>
      <Allotment.Pane preferredSize="85%">{children}</Allotment.Pane>
    </Allotment>
  );
}
