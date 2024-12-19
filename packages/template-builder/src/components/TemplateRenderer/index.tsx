import React, { useMemo, memo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { widgets } from '@finch-cloud/react-renderer';
import { JSONObject } from '@finch-cloud/common';
import { getTemplateById } from '~model/services';
import { useNodeData } from '~hooks/useNodeData';

type TemplateRendererProps = {
  templateId?: string;
};

export const TemplateRenderer = memo(function ({
  templateId,
  ...templateProps
}: TemplateRendererProps) {
  const { data: template } = useQuery({
    queryKey: ['template', templateId],
    queryFn: () => getTemplateById({ id: templateId as string }),
    enabled: !!templateId,
  });

  const context = useMemo(
    () => ({
      templateInputs: template?.data?.inputs?.reduce((acc, input) => {
        const { defaultValue, name } = input;
        const filledValue = templateProps[name];
        acc[name] = filledValue === undefined ? defaultValue : filledValue;
        return acc;
      }, {}),
    }),
    [template, templateProps]
  );

  if (template?.data?.layout) {
    return (
      <ComponentRendererByType {...template.data.layout} context={context} />
    );
  }

  return null;
});

type ComponentRendererByTypeProps = {
  name: string;
  children?: Omit<ComponentRendererByTypeProps, 'context'>[];
  data?: JSONObject;
  dynamicProps?: Record<string, string>;
  context: JSONObject;
};

function ComponentRendererByType({
  name,
  children,
  data,
  dynamicProps,
  context,
}: ComponentRendererByTypeProps) {
  const widget = useMemo(() => widgets[name], [name]);
  const Component = widget.component;
  const calcedProps = useNodeData({ props: data, dynamicProps, context });

  if (Array.isArray(children)) {
    return (
      <Component {...calcedProps}>
        {children.map((child, index) => (
          <ComponentRendererByType key={index} context={context} {...child} />
        ))}
      </Component>
    );
  }

  return <Component {...calcedProps} />;
}
