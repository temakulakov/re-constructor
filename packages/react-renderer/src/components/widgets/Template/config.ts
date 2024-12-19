import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const TEMPLATE_CONFIG: WidgetConfig = {
  name: 'TEMPLATE',
  label: 'Template',
  icon: TemplateIcon,
  defaultProps: {},
};

export const TEMPLATE_PROPS_CONFIG: PropsConfig = {
  general: {
    children: [
      {
        name: 'templateId',
        label: 'Template id',
        description: 'Template id',
        placeholder: 'Template id',
        validationSchema: z.string(),
        renderer: 'SELECT',
        inputProps: {
          mode: 'mapped',
          url: '/api/v1/template?published=false',
          required: true,
        },
      },
    ],
  },
};
