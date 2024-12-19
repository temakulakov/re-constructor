'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Sidebar } from './Sidebar';
import classes from './EditorView.module.css';

type EditorViewProps = { children: React.ReactNode };

export const EditorView = ({ children }: EditorViewProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.wrapper}>
        <Sidebar />
        {children}
      </div>
    </DndProvider>
  );
};
