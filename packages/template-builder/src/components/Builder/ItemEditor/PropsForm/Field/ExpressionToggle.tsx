import { ActionIcon } from '@mantine/core';
import { HiOutlineCodeBracket } from 'react-icons/hi2';

type ExpressionToggleProps = {
  onClick: () => void;
};

export const ExpressionToggle = ({ onClick }: ExpressionToggleProps) => {
  return (
    <ActionIcon variant="subtle" size="xs" onClick={onClick}>
      <HiOutlineCodeBracket />
    </ActionIcon>
  );
};
