import cx from 'clsx';
import { useDrop } from 'react-dnd';

import { dropPositions } from '../../constants';
import classes from './AdjacentDropzone.module.css';

type AdjacentDropzoneProps = {
  position: keyof typeof dropPositions;
};

export const AdjacentDropzone = ({
  position,
  onDrop,
}: AdjacentDropzoneProps) => {
  return (
    <div
      className={cx(
        classes.dropzone,
        classes[`dropzone__${position}`],
        classes[`dropzone__${position}_active`]
      )}
    />
  );
};
