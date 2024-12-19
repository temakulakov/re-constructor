import React, { PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

type CustomIframeProps = PropsWithChildren<
  React.IframeHTMLAttributes<HTMLIFrameElement>
>;

export const CustomIframe = ({
  children,
  title,
  ...props
}: CustomIframeProps) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe {...props} ref={setContentRef} title={title}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
