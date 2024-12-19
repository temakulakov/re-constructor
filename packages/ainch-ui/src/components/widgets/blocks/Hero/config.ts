import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const HERO_CONFIG: WidgetConfig = {
  name: 'HERO',
  label: 'Hero',
  icon: TemplateIcon,
  defaultProps: {},
};

export const HERO_PROPS_CONFIG: PropsConfig = {
  general: {
    children: [
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
        name: 'subtitle',
        label: 'Subtitle',
        description: 'Subtitle',
        placeholder: 'Subtitle',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
        inlineEditable: true,
      },
      {
        name: 'image',
        label: 'Image',
        description: 'Image',
        placeholder: 'Image',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
      },
    ],
  },
};
