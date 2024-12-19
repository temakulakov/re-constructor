'use client';

import { useMemo } from 'react';

import { useTemplateContextStore } from '@finch-cloud/common';
import { useBuilderStore } from '~model/builderSlice';

export const useTemplateContext = () => {
  const { templatesByName } = useTemplateContextStore();
  const { templateSettings } = useBuilderStore();
  const calcedContext = useMemo(() => {
    const context = {
      ...templatesByName,
      templateInputs: templateSettings.inputs.reduce((acc, input) => {
        acc[input.name] = input.defaultValue;
        return acc;
      }, {}),
    };

    return context;
  }, [templatesByName, templateSettings]);

  return calcedContext;
};
