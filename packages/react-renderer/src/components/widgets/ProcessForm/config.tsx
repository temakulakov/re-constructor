import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TextInputIcon } from '~components/icons/form/TextInput';

export const PROCESS_FORM_CONFIG: WidgetConfig = {
  name: 'PROCESS_FORM',
  label: 'Process Form',
  icon: TextInputIcon,
  defaultProps: {},
};

export const PROCESS_FORM_PROPS_CONFIG: PropsConfig = {
  general: {
    children: [
      {
        name: 'formId',
        label: 'Form id',
        description: 'Form id',
        placeholder: 'Form id',
        validationSchema: z.string(),
        renderer: 'SELECT',
        inputProps: { mode: 'mapped', url: '/api/v1/forms', required: true },
      },
      {
        name: 'businessKey',
        label: 'Business key',
        description: 'Business key',
        placeholder: 'Business key',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
      },
    ],
  },
};
