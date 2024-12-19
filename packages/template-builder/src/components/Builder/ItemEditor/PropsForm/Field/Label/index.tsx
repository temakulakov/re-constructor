import { Group } from '@mantine/core';

import { ExpressionToggle } from '../ExpressionToggle';
import classes from './Label.module.css';

type LabelProps = {
  label: React.ReactNode;
  onExpressionToggleClick: () => void;
};

export const Label = ({ label, onExpressionToggleClick }: LabelProps) => {
  return (
    <Group className={classes.wrapper}>
      {label} <ExpressionToggle onClick={onExpressionToggleClick} />
    </Group>
  );
};
