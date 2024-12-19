import { Grid as GridComponent, MantineSpacing } from '@mantine/core';

export const Grid = ({
  columnSize,
  gutter,
  children,
  ...props
}: React.PropsWithChildren<{
  columnSize: string;
  gutter: MantineSpacing;
}>) => {
  return (
    <GridComponent gutter={gutter} {...props}>
      {Array.isArray(children) &&
        children.map((item, index) => (
          <GridComponent.Col key={index} span={parseInt(columnSize, 10)}>
            {item}
          </GridComponent.Col>
        ))}
    </GridComponent>
  );
};
