import { useRef } from 'react';
import { useEditable } from 'use-editable';

import { useBuilderStore } from '~model/builderSlice';
import classes from './InlineTextEditor.module.css';

type InlineTextEditorProps = {
  name: string;
  value: string;
};

export const InlineTextEditor = ({ name, value }: InlineTextEditorProps) => {
  const { selectedId, setNodeData } = useBuilderStore();
  const editorRef = useRef(null);

  // TODO: add debounce if performance is bad
  const onChange = (newValue: string) => {
    if (selectedId !== null) {
      setNodeData({ id: selectedId, data: newValue, property: name });
    }
  };

  useEditable(editorRef, onChange);

  return (
    <span
      className={classes.editor}
      contentEditable
      ref={editorRef}
      suppressContentEditableWarning
      spellCheck={false}
    >
      {value}
    </span>
  );
};
