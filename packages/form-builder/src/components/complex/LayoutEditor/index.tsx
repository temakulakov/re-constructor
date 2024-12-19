import {
  ArrayLayoutProps,
  optionIs,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsArrayLayoutProps } from '@jsonforms/react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { CreatableItems } from './CreateableItems';
import { ItemEditor } from './ItemEditor';
import { LayoutZone } from './LayoutZone';
import classes from './LayoutEditor.module.css';

type LayoutProps = ArrayLayoutProps;

const _LayoutEditor = (props: LayoutProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectItem = (index: number | null) => {
    setSelectedIndex(index);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.wrapper}>
        <CreatableItems />
        <LayoutZone
          onItemClick={selectItem}
          selectedIndex={selectedIndex}
          selectItem={selectItem}
          {...props}
        />
        <ItemEditor selectedIndex={selectedIndex} {...props} />
      </div>
    </DndProvider>
  );
};

export const LayoutEditor = withJsonFormsArrayLayoutProps(_LayoutEditor);

export const layoutEditorTester: RankedTester = rankWith(
  8,
  optionIs('element', 'LayoutEditor')
);
