'use client';

import { useState, MouseEvent, useEffect } from 'react';
import { ScrollArea } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { getPropertyRecursive } from '@finch-cloud/common';
import { templateServices } from '@finch-cloud/template-builder';
import { useTemplatesStore } from '~features/templates/model/templatesSlice';
import { Id } from '../../types';
import { NodeMenu } from './NodeMenu';
import { Root } from './Root';
import classes from './FileTree.module.css';

export const FileTree = () => {
  const { data } = useQuery({
    queryKey: ['templates'],
    keepPreviousData: true,
    queryFn: () => templateServices.getTemplates({ limit: 50, offset: 0 }),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const { initNodes } = useTemplatesStore();

  useEffect(() => {
    if (data) {
      initNodes(data);
    }
  }, [data, initNodes]);

  const [rightClickedId, setRightClickedId] = useState<Id | null>(null);
  const [menuCoordinates, setMenuCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const onRightClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { value } = getPropertyRecursive(
      'file-id',
      event.target as HTMLElement
    );

    const id = value ?? '0';

    setRightClickedId(Number.parseInt(id, 10));
    setMenuCoordinates({ x: event?.pageY || 0, y: event?.pageX || 0 });
  };

  const onMenuClose = () => setRightClickedId(null);

  return (
    <ScrollArea className={classes.list} onContextMenu={onRightClick}>
      <Root />
      {rightClickedId !== null && (
        <NodeMenu
          id={rightClickedId}
          onClose={onMenuClose}
          coordinates={menuCoordinates}
        />
      )}
    </ScrollArea>
  );
};
