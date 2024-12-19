import { create } from 'zustand';
import { produce } from 'immer';
import { RouteController } from '@finch-cloud/common';
import { Process } from '~types';

type ProcessSlice = {
  routeController: RouteController | null;
  setRouteController: (value: RouteController) => void;
  processesById: Record<Process['id'], Process>;
  setProcessData: (data: Process) => void;
};

export const useProcessStore = create<ProcessSlice>()((set) => ({
  routeController: null,
  processesById: {},
  setRouteController: (value) => {
    set(() => ({
      routeController: value,
    }));
  },
  setProcessData: ({ schema, id }) => {
    set(
      produce((state) => {
        state.processesById[id] = schema;
      })
    );
  },
}));
