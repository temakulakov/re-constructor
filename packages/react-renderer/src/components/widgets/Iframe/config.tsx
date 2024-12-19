import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { IframeIcon } from '~components/icons/Iframe';

export const IFRAME_CONFIG: WidgetConfig = {
  name: 'IFRAME',
  label: 'Iframe',
  icon: IframeIcon,
  defaultProps: {},
};

export const IFRAME_PROPS_CONFIG: PropsConfig = {
  general: {
    children: [
      {
        name: 'url',
        label: 'URL',
        description: 'Iframe url',
        placeholder: 'URL',
        validationSchema: z.string(),
        renderer: 'TEXT_INPUT',
      },
      {
        name: 'width',
        label: 'Width',
        placeholder: 'Width',
        validationSchema: z.number(),
        renderer: 'NUMBER_INPUT',
      },
      {
        name: 'height',
        label: 'Height',
        placeholder: 'height',
        validationSchema: z.number(),
        renderer: 'NUMBER_INPUT',
      },
    ],
  },
};
