import * as React from 'react';

export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child?: IconTree[];
}

function Tree2Element(tree?: IconTree[]): React.ReactElement[] | null {
  return tree
    ? tree.map((node, i) =>
        React.createElement(
          node.tag,
          { key: i, ...node.attr },
          Tree2Element(node.child)
        )
      )
    : null;
}

export function createIcon(data: IconTree) {
  return (props: IconBaseProps) => (
    <IconBase attr={{ ...data.attr }} {...props}>
      {Tree2Element(data.child)}
    </IconBase>
  );
}

export type IconBaseProps = React.SVGAttributes<SVGElement> & {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
  attr?: Record<string, string>;
};

export type IconType = (props: IconBaseProps) => JSX.Element;

export function IconBase({
  attr,
  size,
  title,
  children,
  className,
  color,
  style,
  ...svgProps
}: IconBaseProps) {
  const computedSize = size || '1em';

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      {...attr}
      {...svgProps}
      className={className}
      style={{
        color,
        ...style,
      }}
      height={computedSize}
      width={computedSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}
