import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const CASE_CONFIG: WidgetConfig = {
  name: 'CASE',
  label: 'Case',
  icon: TemplateIcon,
  defaultProps: {},
};

export const CASE_PROPS_CONFIG: PropsConfig = {
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
        name: 'description',
        label: 'Description',
        description: 'Description',
        placeholder: 'Description',
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
        name: 'tags',
        label: 'Tags',
        description: 'Tags',
        placeholder: 'Tags',
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
