import { widgets as ainchWidgets } from '@finch-cloud/ainch-ui';
import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { Fragment } from './Fragment';
import { FRAGMENT_CONFIG, FRAGMENT_PROPS_CONFIG } from './Fragment/config';
import { Iframe } from './Iframe';
import { IFRAME_CONFIG, IFRAME_PROPS_CONFIG } from './Iframe/config';
import { ProcessForm } from './ProcessForm';
import {
  PROCESS_FORM_CONFIG,
  PROCESS_FORM_PROPS_CONFIG,
} from './ProcessForm/config';
import { Template } from './Template';
import { TEMPLATE_CONFIG, TEMPLATE_PROPS_CONFIG } from './Template/config';

type Widget = {
  component: React.ElementType<any>;
  config: WidgetConfig;
  propsConfig: PropsConfig;
};

export const widgets: Record<string, Widget> = {
  IFRAME: {
    component: Iframe,
    config: IFRAME_CONFIG,
    propsConfig: IFRAME_PROPS_CONFIG,
  },
  PROCESS_FORM: {
    component: ProcessForm,
    config: PROCESS_FORM_CONFIG,
    propsConfig: PROCESS_FORM_PROPS_CONFIG,
  },
  FRAGMENT: {
    component: Fragment,
    config: FRAGMENT_CONFIG,
    propsConfig: FRAGMENT_PROPS_CONFIG,
  },
  TEMPLATE: {
    component: Template,
    config: TEMPLATE_CONFIG,
    propsConfig: TEMPLATE_PROPS_CONFIG,
  },
  ...ainchWidgets,
};
