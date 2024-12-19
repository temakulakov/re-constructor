// import { z } from 'zod';

import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TextInputIcon } from '~components/icons/form/TextInput';

export const THEME_CONTAINER_CONFIG: WidgetConfig = {
  name: 'THEME_CONTAINER',
  label: 'Theme container',
  icon: TextInputIcon,
  defaultProps: {},
  canHaveChildren: true,
};

export const THEME_CONTAINER_PROPS_CONFIG: PropsConfig = {};
