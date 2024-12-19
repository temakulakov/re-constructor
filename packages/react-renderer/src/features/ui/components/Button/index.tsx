import { Button as ButtonComponent, ButtonProps } from '@mantine/core';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <ButtonComponent {...props}>{children}</ButtonComponent>
);
