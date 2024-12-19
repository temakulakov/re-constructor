import { forwardRef } from 'react';

import classes from './Iframe.module.css';

type IframeProps = { url: string };

export const Iframe = forwardRef<HTMLIFrameElement, IframeProps>(
  ({ url }, ref) => {
    return (
      <div className={classes.wrapper}>
        <iframe
          className={classes.iframe}
          ref={ref}
          title="template"
          src={url}
          id="template"
          allow={`accelerometer; ambient-light-sensor; camera; encrypted-media;
          geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking`}
          sandbox={`allow-forms allow-modals allow-popups allow-presentation
          allow-same-origin allow-scripts allow-downloads`}
        />
      </div>
    );
  }
);
