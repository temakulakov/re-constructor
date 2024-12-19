import { widgets as baseWidgets } from '@finch-cloud/react-renderer';
import { TemplateRenderer } from '~components/TemplateRenderer';

export const widgets = {
  ...baseWidgets,
  [baseWidgets.TEMPLATE.config.name]: {
    ...baseWidgets.TEMPLATE,
    component: TemplateRenderer,
  },
} as const;

export const draggableItems = {
  CREATABLE_ITEM: 'CREATABLE_ITEM',
  DRAGGABLE_ITEM: 'DRAGGABLE_ITEM',
} as const;

export const componentGroupNames = {
  form: 'form',
  layout: 'layout',
  data: 'data',
  ainch: 'ainch',
} as const;

export const componentGroups = {
  [componentGroupNames.layout]: {
    name: 'Layout',
    components: [widgets.FRAGMENT],
  },
  [componentGroupNames.data]: {
    name: 'Data',
    components: [widgets.IFRAME, widgets.TEMPLATE],
  },
  [componentGroupNames.ainch]: {
    name: 'Ainch',
    components: [
      widgets.THEME_CONTAINER,
      widgets.CASE,
      widgets.COLUMNS,
      widgets.DEFAULT_BLOCK,
      widgets.CONTENT,
      widgets.HERO,
      widgets.WORK_PLAN,
      widgets.FEEDBACK,
    ],
  },
  [componentGroupNames.form]: {
    name: 'Form',
    components: [
      widgets.PROCESS_FORM,
      // componentNames.Form,
      // componentNames.TextInput,
      // componentNames.NumberInput,
      // componentNames.Checkbox,
      // componentNames.DateInput,
      // componentNames.FileInput,
      // componentNames.RadioGroup,
      // componentNames.Select,
      // componentNames.Slider,
      // componentNames.Textarea,
    ],
  },
};
