import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { JSONObject } from '../types/common';

type TemplateContextSlice = {
  templatesByName: Record<string, JSONObject>;
  setTemplateData: (data: { name: string; data: JSONObject }) => void;
  deleteTemplateData: (data: { name: string }) => void;
};

const tmpData = {
  form1: {
    backgroundColor: '#ffffffff',
    footerHeight: 7,
    headerHeight: 10,
    radius: '4px',
    resetAfterSuccessful: true,
    shadow: 'small',
    showFooter: true,
    showHeader: true,
    validateInputsOnSubmit: true,
    displayName: 'form1',
    formData: {},
  },
  button1: {
    colorScheme: 'blue',
    events: [
      {
        actionType: 'widget',
        eventType: 'click',
        id: '44eedc89-155f-4147-9b14-3a782d385824',
        widgetID: 'form1',
        widgetMethod: 'submit',
      },
    ],
    hidden: false,
  },
  pageInfos: [
    {
      pagePath: '/page1',
      subPagePath: '/page1/sub-page1',
    },
  ],
};

export const useTemplateContextStore = create<TemplateContextSlice>()(
  immer((set) => ({
    templatesByName: { template1: tmpData },
    setTemplateData: ({ name, data }) => {
      set((state) => {
        // @ts-ignore
        state.templatesByName[name] = data;
      });
    },
    deleteTemplateData: ({ name }) => {
      set((state) => {
        delete state.templatesByName[name];
      });
    },
  }))
);
