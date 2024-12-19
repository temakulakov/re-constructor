import {
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
  VerticalLayout,
} from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';

import { LayoutRenderer, LayoutRendererProps } from './LayoutRenderer';

export const VerticalLayoutRenderer = withJsonFormsLayoutProps(
  ({
    uischema,
    schema,
    path,
    enabled,
    visible,
    renderers,
    cells,
  }: LayoutProps) => {
    const verticalLayout = uischema as VerticalLayout;
    const childProps: LayoutRendererProps = {
      elements: verticalLayout.elements,
      schema,
      path,
      enabled,
      direction: 'column',
      visible,
    };

    return (
      <LayoutRenderer {...childProps} renderers={renderers} cells={cells} />
    );
  }
);

export const verticalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('VerticalLayout')
);
