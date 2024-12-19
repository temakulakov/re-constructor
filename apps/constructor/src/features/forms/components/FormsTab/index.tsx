'use client';

import { memo, useState } from 'react';
import { ActionIcon, Flex, ScrollArea, Text, Title } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';

import { FileIcon, getPropertyRecursive, PlusIcon } from '@finch-cloud/common';
import { getForms } from '~features/editor/model/services';
import { PACKAGE_VERSION } from '~constants/packageVersion';
import { NodeMenu } from './NodeMenu';
import classes from './FormsTab.module.css';

export const FormsTab = memo(function FormsTab() {
  const { data } = useQuery({
    queryKey: ['forms'],
    keepPreviousData: true,
    queryFn: () => getForms({ limit: 50, offset: 0 }),
  });

  const { id: formId } = useParams<{ id: string }>();
  const router = useRouter();
  const [rightClickedId, setRightClickedId] = useState<string | null>(null);
  const [menuCoordinates, setMenuCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const onRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { value } = getPropertyRecursive(
      'file-id',
      event.target as HTMLElement
    );
    const id = value ?? '0';

    setRightClickedId(id);
    setMenuCoordinates({ x: event?.pageY || 0, y: event?.pageX || 0 });
  };

  const onMenuClose = () => setRightClickedId(null);

  const onCreateClick = () => {
    router.push('/forms');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.toolbar}>
        <Title order={3} size={14} className={classes.title}>
          FINCH Forms v{PACKAGE_VERSION}
        </Title>
        <ActionIcon ml="auto" onClick={onCreateClick}>
          <PlusIcon />
        </ActionIcon>
      </div>
      {data ? (
        <ScrollArea offsetScrollbars onContextMenu={onRightClick}>
          {data.map(({ name, id, createdAt }) => (
            <Link
              key={id}
              href={`/forms/${id}`}
              className={clsx(classes.link, id === formId && classes.active)}
              title={createdAt}
            >
              <Flex
                py={4}
                align="center"
                className={classes.file}
                data-file-id={id}
              >
                <div className={classes['icon-wrapper']}>
                  <FileIcon />
                </div>
                <Text ml={8} size="sm" className={classes['file-name']}>
                  {name}
                </Text>
              </Flex>
            </Link>
          ))}
          {rightClickedId !== null && (
            <NodeMenu
              id={rightClickedId}
              onClose={onMenuClose}
              coordinates={menuCoordinates}
            />
          )}
        </ScrollArea>
      ) : null}
    </div>
  );
});
