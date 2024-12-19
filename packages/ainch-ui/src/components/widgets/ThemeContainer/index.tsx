import { View } from '../View';
import classes from './ThemeContainer.module.css';

type ThemeContainerProps = {
  children: React.ReactNode;
};

export const ThemeContainer = ({ children }: ThemeContainerProps) => {
  return (
    <div className={classes.wrapper}>
      <View>{children}</View>
    </div>
  );
};
