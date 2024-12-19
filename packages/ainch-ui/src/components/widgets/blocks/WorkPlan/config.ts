import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const WORK_PLAN_CONFIG: WidgetConfig = {
  name: 'WORK_PLAN',
  label: 'Work plan',
  icon: TemplateIcon,
  defaultProps: {},
};

export const WORK_PLAN_PROPS_CONFIG: PropsConfig = {
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
      },
      {
        name: 'secondCaption',
        label: 'Second caption',
        description: 'Second caption',
        placeholder: 'Second caption',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
      },
      {
        name: 'content',
        label: 'Content',
        description: 'Content',
        placeholder: 'Content',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
      },
      {
        name: 'secondContent',
        label: 'Second content',
        description: 'Second content',
        placeholder: 'Second content',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
      },
    ],
  },
};
