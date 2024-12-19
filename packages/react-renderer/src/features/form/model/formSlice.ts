import { JSONObject } from '@finch-cloud/common';
import { create } from 'zustand';

type FormSlice = {
  namespaces: { [key: string]: { [key: string]: JSONValue } };
  setNamespaceData: (name: string, data: { [key: string]: JSONObject }) => void;
};

export type AppState = FormSlice;

export const useFormStore = create<FormSlice>()((set) => ({
  namespaces: {},
  setNamespaceData: (name, data) => {
    set((prev) => ({
      namespaces: {
        ...prev.namespaces,
        [name]: { ...(prev.namespaces[name] ?? {}), ...data },
      },
    }));
  },
}));
