import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const CONTENT_CONFIG: WidgetConfig = {
  name: 'CONTENT',
  label: 'Content',
  icon: TemplateIcon,
  defaultProps: {},
};

export const CONTENT_PROPS_CONFIG: PropsConfig = {
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
        name: 'text',
        label: 'Text',
        description: 'Text',
        placeholder: 'Text',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
        inlineEditable: true,
      },
      {
        name: 'link',
        label: 'Link',
        description: 'Link',
        placeholder: 'Link',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
      },
    ],
  },
};
