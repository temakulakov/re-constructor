import React, { useMemo, memo } from 'react';
import { dataAttributes } from '@finch-cloud/common';
import { getComponentByType } from '../../utils/getComponentByType';

import {
  RendererProps,
  ComponentRendererProps,
  ComponentWrapperProps,
} from './types';

export const Renderer = memo(function ({
  data,
  components = {},
}: RendererProps) {
  if (typeof data !== 'object') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{data}</>;
  }

  if (data) {
    return (
      <>
        {data.map((dataItem, index) => (
          <Renderer key={index} data={dataItem} components={components} />
        ))}
      </>
    );
  }

  if (typeof data === 'object' && data.$type) {
    return (
      <ComponentRendererByType
        {...data}
        $id={Number(data.$id)}
        components={components}
      />
    );
  }

  return null;
});

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  $id,
  children,
  component: Component,
  ...props
}) => {
  return (
    <Component {...{ [dataAttributes.id]: $id }} {...props}>
      {children}
    </Component>
  );
};

function ComponentRendererByType({
  $type: type,
  $id,
  children,
  components,
  ...props
}: ComponentRendererProps) {
  const Component = getComponentByType({ type, components }) as React.FC;

  const formattedChildren = useMemo(
    () =>
      Array.isArray(children) ? (
        children.map((item, index) => (
          <Renderer key={index} data={item} components={components} />
        ))
      ) : (
        <Renderer data={children} components={components} />
      ),
    [children, components]
  );

  if (!Component) {
    return (
      <pre>
        <code style={{ fontSize: '10px' }}>
          {JSON.stringify({ children, type, ...props }, null, 2)}
        </code>
      </pre>
    );
  }

  if (!children) {
    return <ComponentWrapper $id={$id} component={Component} {...props} />;
  }

  return (
    <ComponentWrapper $id={$id} component={Component} {...props}>
      {formattedChildren}
    </ComponentWrapper>
  );
}
