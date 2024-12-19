import { ReactNode } from 'react';
import cx from 'clsx';

import classes from './GridBlock.module.css';

const Item = ({ children, className, ...props }) => (
  <li className={cx(classes.item, className)} {...props}>
    {children}
  </li>
);

type GridBlockProps = { children: ReactNode };

export const GridBlock = ({ children }: GridBlockProps) => {
  return <div className={classes.list}>{children}</div>;
};

GridBlock.Item = Item;
