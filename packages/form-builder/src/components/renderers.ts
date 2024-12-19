import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';

import {
  ArrayControlRenderer,
  arrayControlTester,
} from './complex/ArrayControlRenderer';
import { oneOfControlTester, OneOfRenderer } from './complex/OneOfRenderer';
import {
  BooleanControl,
  booleanControlTester,
} from './controls/BooleanControl';
import { ConstControl, constControlTester } from './controls/ConstControl';
import { NumberControl, numberControlTester } from './controls/NumberControl';
import { TextControl, textControlTester } from './controls/TextControl';
import {
  ArrayLayoutRenderer,
  arrayLayoutTester,
} from './layouts/ArrayLayoutRenderer';
import {
  VerticalLayoutRenderer,
  verticalLayoutTester,
} from './layouts/VerticalLayout';
import { DateControl, dateControlTester } from './controls/DateControl';
import {
  TextareaControl,
  textareaControlTester,
} from './controls/TextareaControl';
import {
  EnumArrayRenderer,
  enumArrayRendererTester,
} from './complex/EnumArrayRenderer';
import { SliderControl, sliderControlTester } from './controls/SliderControl';
import {
  EnumRadioGroupControl,
  enumRadioGroupControlTester,
  OneOfRadioGroupControl,
  oneOfRadioGroupControlTester,
} from './controls/RadioGroupControl';
import {
  EnumSelectControl,
  enumSelectControlTester,
  OneOfSelectControl,
  oneOfSelectControlTester,
} from './controls/SelectControl';
import { FileControl, fileControlTester } from './controls/FileControl';
import { CodeDataDisplay, codeDataDisplayTester } from './data-display/Code';
import { LayoutEditor, layoutEditorTester } from './complex/LayoutEditor';

export const renderers: JsonFormsRendererRegistryEntry[] = [
  { tester: booleanControlTester, renderer: BooleanControl },
  { tester: textControlTester, renderer: TextControl },
  { tester: numberControlTester, renderer: NumberControl },
  { tester: oneOfControlTester, renderer: OneOfRenderer },
  { tester: verticalLayoutTester, renderer: VerticalLayoutRenderer },
  { tester: arrayLayoutTester, renderer: ArrayLayoutRenderer },
  { tester: constControlTester, renderer: ConstControl },
  { tester: arrayControlTester, renderer: ArrayControlRenderer },
  { tester: textareaControlTester, renderer: TextareaControl },
  { tester: dateControlTester, renderer: DateControl },
  { tester: enumSelectControlTester, renderer: EnumSelectControl },
  { tester: oneOfSelectControlTester, renderer: OneOfSelectControl },
  { tester: sliderControlTester, renderer: SliderControl },
  { tester: enumRadioGroupControlTester, renderer: EnumRadioGroupControl },
  { tester: oneOfRadioGroupControlTester, renderer: OneOfRadioGroupControl },
  { tester: enumArrayRendererTester, renderer: EnumArrayRenderer },
  { tester: fileControlTester, renderer: FileControl },
  { tester: codeDataDisplayTester, renderer: CodeDataDisplay },
  { tester: layoutEditorTester, renderer: LayoutEditor },
];
