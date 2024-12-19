import { create } from 'zustand';

import { JSONObject } from '@finch-cloud/common';
import { JsonSchema, UISchema } from '@finch-cloud/form-builder';

type EditorSlice = {
  businessKey: string;
  builderSettings: {
    name?: string;
    description?: string;
    submitUrl?: string;
  };
  builderData: JSONObject;
  schema: JsonSchema | null;
  uiSchema: UISchema | null;
  setBuilderData: (data: JSONObject) => void;
  setBuilderSettings: (data: JSONObject) => void;
  setSchema: (data: JsonSchema) => void;
  setUiSchema: (data: UISchema) => void;
  setBusinessKey: (value: string) => void;
};

export const useEditorStore = create<EditorSlice>()(
  // persist(
  (set) => ({
    builderSettings: {},
    builderData: {},
    businessKey: '',
    schema: null,
    uiSchema: null,
    setBuilderData: (newData) => {
      set(() => ({
        builderData: newData,
      }));
    },
    setBuilderSettings: (newData) => {
      set(({ builderSettings: prevBuilderSettings }) => ({
        builderSettings: { ...prevBuilderSettings, ...newData },
      }));
    },
    setSchema: (newSchema) => {
      set(() => ({
        schema: newSchema,
      }));
    },
    setUiSchema: (newSchema) => {
      set(() => ({
        uiSchema: newSchema,
      }));
    },
    setBusinessKey: (value) => {
      set(() => ({
        businessKey: value,
      }));
    },
  })
  //   {
  //     name: 'editor-storage',
  //     storage: createJSONStorage(() => localStorage),
  //     version: 4,
  //   }
  // )
);
