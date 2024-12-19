import {
  List as ListComponent,
  ListProps as BaseListProps,
  ThemeIcon,
} from '@mantine/core';
import { BiCheckCircle } from 'react-icons/bi';

export type ListProps = {
  children: React.ReactNode;
} & BaseListProps;

export const List = ({ children, ...props }: ListProps) => {
  return (
    <ListComponent
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <BiCheckCircle size={16} />
        </ThemeIcon>
      }
      {...props}
    >
      {Array.isArray(children) &&
        children.map((item, index) => (
          <ListComponent.Item key={index}>{item}</ListComponent.Item>
        ))}
    </ListComponent>
  );
};
