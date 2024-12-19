import { ReactNode, useCallback } from 'react';
import { Popover, ScrollArea } from '@mantine/core';
import cx from 'clsx';

import { VALIDATION_TYPES } from '~utils/validationFactory';
import classes from './HintTooltip.module.css';

export type HintTooltipProps = {
  isEditorFocused: boolean;
  hasError?: boolean;
  resultType?: VALIDATION_TYPES;
  result?: string;
  children: ReactNode;
};

export const HintTooltip = ({
  isEditorFocused,
  result,
  hasError,
  resultType,
  children,
}: HintTooltipProps) => {
  const handleClickCopy = useCallback(() => {
    if (result) {
      //  copy(result);
    }
  }, [result]);

  return (
    <Popover
      width="target"
      offset={0}
      position="bottom-start"
      withArrow={false}
      shadow="md"
      opened={isEditorFocused}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown
        className={cx(classes.wrapper, hasError && classes.wrapper_error)}
        onMouseDown={(event) => {
          event.preventDefault();
          // event.stopPropagation();
        }}
      >
        <ScrollArea mah={250} offsetScrollbars>
          {!hasError && <div className={classes.result}>{resultType}</div>}
          <div className={classes.result}>{result}</div>
        </ScrollArea>
        {/* <CopyIcon css={copyIconStyle} onClick={handleClickCopy} /> */}
      </Popover.Dropdown>
    </Popover>
  );
};
