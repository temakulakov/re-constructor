import { memo } from 'react';
import { ActionIcon, Flex, Group, Text, Tooltip } from '@mantine/core';
import { ArrayTranslations } from '@jsonforms/core';

import { ExclamationCircleIcon, PlusIcon } from '@finch-cloud/common';

export type ArrayLayoutToolbarProps = {
  label: string;
  errors: string;
  path: string;
  enabled: boolean;
  addItem(path: string, data: any): () => void;
  createDefault(): any;
  translations: ArrayTranslations;
};

export const ArrayLayoutToolbar = memo(function Toolbar({
  label,
  errors,
  addItem,
  path,
  enabled,
  createDefault,
  translations,
}: ArrayLayoutToolbarProps) {
  return (
    <Flex w="100%" justify="space-between">
      <Group>
        <Text>{label}</Text>
        {errors.length !== 0 && (
          <Tooltip label={errors} position="bottom" multiline>
            <ActionIcon c="red.6">
              <ExclamationCircleIcon />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      {enabled ? (
        <Tooltip label={translations.addTooltip} position="bottom">
          <ActionIcon
            aria-label={translations.addAriaLabel}
            onClick={addItem(path, createDefault())}
          >
            <PlusIcon />
          </ActionIcon>
        </Tooltip>
      ) : null}
    </Flex>
  );
});
