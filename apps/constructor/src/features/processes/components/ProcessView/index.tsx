'use client';

import { memo, useMemo } from 'react';
import { Allotment } from 'allotment';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

import { RouteController, Navigate } from '@finch-cloud/common';
import classes from './ProcessView.module.css';
import '@finch-cloud/process-builder/dist/index.css';

const ModelViewDynamic = dynamic(
  () => import('./ModelView').then((m) => m.ModelView),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const ProcessView = memo(function ProcessView() {
  const { id: processId } = useParams<{ id: string }>();
  const router = useRouter();

  const routeController = useMemo(() => {
    return new RouteController({
      navigate: router.push as Navigate,
    });
  }, [router.push]);

  return (
    <Allotment>
      <div className={classes.wrapper}>
        <ModelViewDynamic id={processId} routeController={routeController} />
      </div>
    </Allotment>
  );
});
