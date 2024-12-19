import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TemplateIcon } from '~components/icons/Template';

export const COLUMNS_CONFIG: WidgetConfig = {
  name: 'COLUMNS',
  label: 'Columns',
  icon: TemplateIcon,
  defaultProps: {},
  canHaveChildren: true,
};

export const COLUMNS_PROPS_CONFIG: PropsConfig = {
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
      // {
      //   name: 'blocks',
      //   label: 'Blocks',
      //   description: 'Blocks',
      //   placeholder: 'Blocks',
      //   validationSchema: z.array(
      //     z
      //       .object({
      //         title: z.string(),
      //         client: z.string(),
      //         text: z.string(),
      //         image: z.string(),
      //         tags: z.string(),
      //         caption: z.string(),
      //         link: z.string(),
      //       })
      //       .partial()
      //   ),
      //   renderer: 'EXPRESSION_INPUT',
      //   inputProps: {},
      // },
    ],
  },
};
