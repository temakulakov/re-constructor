import { PropsConfig, WidgetConfig } from '@finch-cloud/common';
import { Case } from './blocks/Case';
import { CASE_CONFIG, CASE_PROPS_CONFIG } from './blocks/Case/config';
import { Columns } from './blocks/Columns';
import { COLUMNS_CONFIG, COLUMNS_PROPS_CONFIG } from './blocks/Columns/config';
import { Content } from './blocks/Content';
import { CONTENT_CONFIG, CONTENT_PROPS_CONFIG } from './blocks/Content/config';
import { Hero } from './blocks/Hero';
import { HERO_CONFIG, HERO_PROPS_CONFIG } from './blocks/Hero/config';
import { WorkPlan } from './blocks/WorkPlan';
import {
  WORK_PLAN_CONFIG,
  WORK_PLAN_PROPS_CONFIG,
} from './blocks/WorkPlan/config';
import { ThemeContainer } from './ThemeContainer';
import {
  THEME_CONTAINER_CONFIG,
  THEME_CONTAINER_PROPS_CONFIG,
} from './ThemeContainer/config';
import { DefaultBlock } from './blocks/DefaultBlock';
import {
  DEFAULT_BLOCK_CONFIG,
  DEFAULT_BLOCK_PROPS_CONFIG,
} from './blocks/DefaultBlock/config';
import { Feedback } from './blocks/Feedback';
import {
  FEEDBACK_CONFIG,
  FEEDBACK_PROPS_CONFIG,
} from './blocks/Feedback/config';

type Widget = {
  component: React.ElementType;
  config: WidgetConfig;
  propsConfig: PropsConfig;
};

export const widgets: Record<string, Widget> = {
  THEME_CONTAINER: {
    component: ThemeContainer,
    config: THEME_CONTAINER_CONFIG,
    propsConfig: THEME_CONTAINER_PROPS_CONFIG,
  },
  CASE: {
    component: Case,
    config: CASE_CONFIG,
    propsConfig: CASE_PROPS_CONFIG,
  },
  COLUMNS: {
    component: Columns,
    config: COLUMNS_CONFIG,
    propsConfig: COLUMNS_PROPS_CONFIG,
  },
  DEFAULT_BLOCK: {
    component: DefaultBlock,
    config: DEFAULT_BLOCK_CONFIG,
    propsConfig: DEFAULT_BLOCK_PROPS_CONFIG,
  },
  CONTENT: {
    component: Content,
    config: CONTENT_CONFIG,
    propsConfig: CONTENT_PROPS_CONFIG,
  },
  HERO: {
    component: Hero,
    config: HERO_CONFIG,
    propsConfig: HERO_PROPS_CONFIG,
  },
  WORK_PLAN: {
    component: WorkPlan,
    config: WORK_PLAN_CONFIG,
    propsConfig: WORK_PLAN_PROPS_CONFIG,
  },
  FEEDBACK: {
    component: Feedback,
    config: FEEDBACK_CONFIG,
    propsConfig: FEEDBACK_PROPS_CONFIG,
  },
};
