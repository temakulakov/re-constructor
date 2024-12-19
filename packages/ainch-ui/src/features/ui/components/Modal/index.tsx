import { Portal } from '../Portal';
import { ModalProps } from './types';
import { Overlay, Wrapper, Title, Content, CloseButton } from './styles';

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  withCloseIcon = true,
  closeOnOverlayClick = true,
}: ModalProps) =>
  isOpen ? (
    <Portal selector="body">
      <Overlay
        onClick={(e) => {
          if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <Wrapper className={className}>
          {withCloseIcon && <CloseButton onClick={onClose} />}
          {title && (
            <Title variant="h3" align="center">
              {title}
            </Title>
          )}
          <Content>{children}</Content>
        </Wrapper>
      </Overlay>
    </Portal>
  ) : null;
