type MenuChildProps = {
  title: string;
  icon?: JSX.Element;
  rightSection?: JSX.Element;
  onClick?: () => void;
};

export type MenuItemProps = {
  title: string;
  items: MenuChildProps[];
};
