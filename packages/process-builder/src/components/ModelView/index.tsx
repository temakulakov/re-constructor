'use client';

import { useEffect, memo, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';

import { RouteController } from '@finch-cloud/common';
import {
  saveProcess,
  deleteProcess,
  fetchProcessData,
  useProcessStore,
} from '~/model';
import { Process } from '~types';
import { BPMNModeler } from '../BPMNModeler';
import classes from './ModelView.module.css';

type ModelViewProps = {
  id: string;
  routeController: RouteController;
};

export const ModelView = memo(({ id, routeController }: ModelViewProps) => {
  const { setRouteController, setProcessData, processesById } =
    useProcessStore();
  const modelerRef = useRef<Modeler | null>(null);
  const queryClient = useQueryClient();
  const cachedData = processesById[id];

  const { data, isPreviousData } = useQuery({
    queryKey: ['process', id],
    queryFn: () => fetchProcessData({ id }),
    enabled: !!id,
    keepPreviousData: true,
  });

  const processData = cachedData || data;
  console.log({ data, processesById });
  const handleSaveProcess = (value: string) => {
    // TODO should refactor this logic as long as process saving will be made
    saveProcess({
      id,
      schema: value,
      name: processData?.name,
    });
  };

  const handleReloadProcess = () => {
    queryClient.invalidateQueries({ queryKey: ['process', id] }).then(() => {
      if (data && !isPreviousData) {
        // TODO should refactor this logic as long as process saving will be made
        setProcessData(data);
      }
    });
  };
  type d = Pick<Process, 'id'>;
  const handleDeleteProcess = () => {
    deleteProcess(id);
  };

  useEffect(() => {
    setRouteController(routeController);
  }, [routeController, setRouteController]);

  useEffect(() => {
    async function saveProcessData() {
      const handleCashProcess = (value: string) => {
        setProcessData({
          id,
          schema: value,
          name: processData?.name,
        });
      };

      if (modelerRef.current) {
        const { xml } = await modelerRef.current.saveXML({ format: true });

        if (xml) {
          handleCashProcess(xml);
        }
      }
    }
  }, [processData, id, routeController, setProcessData]);

  return (
    <div className={classes.wrapper}>
      {processData && (
        <BPMNModeler
          ref={modelerRef}
          schema={processData.schema}
          name={processData.name}
          saveProcess={handleSaveProcess}
          deleteProcess={handleDeleteProcess}
          reloadProcess={handleReloadProcess}
        />
      )}
    </div>
  );
});
