import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const DEFAULT_BLOCK_CONFIG: WidgetConfig = {
  name: 'DEFAULT_BLOCK',
  label: 'Default block',
  icon: TemplateIcon,
  defaultProps: {
    caption: 'Caption',
    title: 'Title',
    text: 'Text',
  },
};

export const DEFAULT_BLOCK_PROPS_CONFIG: PropsConfig = {
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
        name: 'client',
        label: 'Client',
        description: 'Client',
        placeholder: 'Client',
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
        name: 'image',
        label: 'Image',
        description: 'Image',
        placeholder: 'Image',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
        inputProps: {},
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
} as const;
