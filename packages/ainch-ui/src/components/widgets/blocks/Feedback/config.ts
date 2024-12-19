import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const FEEDBACK_CONFIG: WidgetConfig = {
  name: 'FEEDBACK',
  label: 'Feedback',
  icon: TemplateIcon,
  defaultProps: {},
};

export const FEEDBACK_PROPS_CONFIG: PropsConfig = {
  general: {
    children: [
      {
        name: 'caption',
        label: 'Caption',
        description: 'Caption',
        placeholder: 'Caption',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
        inlineEditable: true,
      },
      {
        name: 'title',
        label: 'Title',
        description: 'Title',
        placeholder: 'Title',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
        inlineEditable: true,
      },
      {
        name: 'text',
        label: 'Text',
        description: 'Text',
        placeholder: 'Text',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
      },
    ],
  },
};
