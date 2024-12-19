import { useCallback, useState } from 'react';
import {
  ArrayLayoutProps,
  RankedTester,
  isObjectArrayControl,
  isPrimitiveArrayControl,
  or,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsArrayLayoutProps } from '@jsonforms/react';

// import { MaterialTableControl } from './MaterialTableControl';
// import { DeleteDialog } from './DeleteDialog';
import { ArrayLayout } from '~components/layouts/ArrayLayoutRenderer';

export const _ArrayControlRenderer = (props: ArrayLayoutProps) => {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(undefined);
  const [rowData, setRowData] = useState(undefined);
  const { removeItems, visible } = props;

  const openDeleteDialog = useCallback(
    (p: string, rowIndex: number) => {
      setOpen(true);
      setPath(p);
      setRowData(rowIndex);
    },
    [setOpen, setPath, setRowData]
  );
  const deleteCancel = useCallback(() => setOpen(false), [setOpen]);
  const deleteConfirm = useCallback(() => {
    const p = path.substring(0, path.lastIndexOf('.'));
    removeItems(p, [rowData])();
    setOpen(false);
  }, [setOpen, path, rowData]);
  const deleteClose = useCallback(() => setOpen(false), [setOpen]);

  return <ArrayLayout {...props} />;
};

export const arrayControlTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl)
);

export const ArrayControlRenderer = withJsonFormsArrayLayoutProps(
  _ArrayControlRenderer
);
