import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { getHotkeyHandler, useUncontrolled } from '@mantine/hooks';

import { FolderIcon, FileIcon } from '@finch-cloud/common';
import { Directory, Id, NodeTypes } from '~features/templates/types';
import { useTemplatesStore } from '~features/templates/model/templatesSlice';
import classes from './EditNodeName.module.css';

type EditNodeNameProps = {
  nodeType: NodeTypes;
  indent: number;
  onEditFinished: (value: string, nodeType: NodeTypes) => void;
  defaultValue?: string;
  parentId: Id;
  id?: Id;
};

export const EditNodeName = ({
  nodeType,
  indent,
  onEditFinished,
  defaultValue = '',
  parentId,
  id,
}: EditNodeNameProps) => {
  const [value, handleChange] = useUncontrolled<string>({
    defaultValue,
    finalValue: '',
  });
  const [error, setError] = useState<null | string>(null);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = ev.currentTarget;
    const { nodesById } = useTemplatesStore.getState();
    const siblingIds = (nodesById[parentId] as Directory).childrenIds;
    const sameNameSibling = siblingIds.find(
      (siblingId) =>
        nodesById[siblingId].name === inputValue && siblingId !== id
    );

    if (sameNameSibling) {
      setError('Файл или папка с таким именем уже существует');
    } else {
      setError(null);
    }

    handleChange(inputValue.trim());
  };

  const onCancel = () => {
    handleChange(defaultValue);
    onEditFinished(defaultValue, nodeType);
  };

  const onBlur = () => {
    if (!error) {
      onEditFinished(value, nodeType);
    } else {
      onCancel();
    }
  };

  return (
    <div className={classes.wrapper} style={{ paddingLeft: indent * 8 }}>
      <div className={classes['icon-wrapper']}>
        {nodeType === NodeTypes.FILE && <FileIcon />}
        {nodeType === NodeTypes.DIRECTORY && <FolderIcon />}
      </div>
      <TextInput
        value={value}
        classNames={{
          root: classes.root,
          input: classes.input,
          error: classes.error,
        }}
        error={error}
        autoFocus
        spellCheck="false"
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={getHotkeyHandler([
          ['Enter', onBlur],
          ['Escape', onCancel],
        ])}
      />
      {error ? <div className={classes.error}>{error}</div> : null}
    </div>
  );
};
