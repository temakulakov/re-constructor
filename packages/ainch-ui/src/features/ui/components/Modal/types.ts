export type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  withCloseIcon?: boolean;
  closeOnOverlayClick?: boolean;
}>;
