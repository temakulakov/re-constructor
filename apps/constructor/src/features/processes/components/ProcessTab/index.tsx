'use client';

import { memo } from 'react';
import { ActionIcon, Box, Flex, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';

import {
  CreateProcessModal,
  fetchProcessList,
} from '@finch-cloud/process-builder';
import { FileIcon, PlusIcon } from '@finch-cloud/common';
import { PACKAGE_VERSION } from '~constants/packageVersion';
import classes from './ProcessTab.module.css';

export const ProcessTab = memo(function ProcessTab() {
  const { id: routeProcessId } = useParams<{ id: string }>();
  const [isOpened, { open: openCreateProcessModal, close }] =
    useDisclosure(false);

  const { data, refetch } = useQuery({
    queryKey: ['diagram'],
    keepPreviousData: true,
    queryFn: () => fetchProcessList({ limit: 50, offset: 0 }),
  });

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.toolbar}>
          <Title order={3} size={14} className={classes.title}>
            FINCH Process v{PACKAGE_VERSION}
          </Title>
          <ActionIcon ml="auto" onClick={openCreateProcessModal}>
            <PlusIcon />
          </ActionIcon>
        </div>
        {data ? (
          <Box>
            {data?.map(({ id, name }) => (
              <Link
                key={id}
                className={clsx(
                  classes.link,
                  id === routeProcessId && classes.active
                )}
                href={`/processes/${id}`}
              >
                <Flex
                  py={4}
                  align="center"
                  className={classes.process}
                  data-file-id={id}
                >
                  <div className={classes['icon-wrapper']}>
                    <FileIcon />
                  </div>
                  <Text ml={8} size="sm" className={classes['file-name']}>
                    {name || id}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Box>
        ) : null}
      </div>
      <CreateProcessModal
        isOpened={isOpened}
        close={close}
        onSuccess={refetch}
      />
    </>
  );
});
