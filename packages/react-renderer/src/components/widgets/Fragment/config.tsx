import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { TextInputIcon } from '~components/icons/form/TextInput';

export const FRAGMENT_CONFIG: WidgetConfig = {
  name: 'FRAGMENT',
  label: 'Fragment',
  icon: TextInputIcon,
  defaultProps: {},
  canHaveChildren: true,
};

export const FRAGMENT_PROPS_CONFIG: PropsConfig = {};
