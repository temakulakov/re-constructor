import { useCallback, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Flex, Modal, Select, Stack, Text } from '@mantine/core';
import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  createDefaultValue,
  isOneOfControl,
  JsonSchema,
  OwnPropsOfControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsOneOfProps } from '@jsonforms/react';

import { CombinatorProperties } from './CombinatorProperties';

export interface OwnOneOfProps extends OwnPropsOfControl {
  indexOfFittingSchema?: number;
}

export const OneOfRenderer = withJsonFormsOneOfProps(
  ({
    handleChange,
    schema,
    path,
    renderers,
    cells,
    rootSchema,
    id,
    visible,
    label,
    indexOfFittingSchema,
    uischema,
    uischemas,
    data,
  }: CombinatorRendererProps) => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(
      indexOfFittingSchema || 0
    );
    const [newSelectedIndex, setNewSelectedIndex] = useState(0);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);
    const cancel = useCallback(() => {
      setOpen(false);
    }, [setOpen]);
    const oneOfRenderInfos = createCombinatorRenderInfos(
      (schema as JsonSchema).oneOf,
      rootSchema,
      'oneOf',
      uischema,
      path,
      uischemas
    );

    const openNewTab = useCallback(
      (newIndex: number) => {
        handleChange(
          path,
          createDefaultValue(oneOfRenderInfos[newIndex].schema)
        );
        setSelectedIndex(newIndex);
      },
      [handleChange, oneOfRenderInfos, path]
    );

    const confirm = useCallback(() => {
      openNewTab(newSelectedIndex);
      setOpen(false);
    }, [openNewTab, newSelectedIndex]);

    const handleOneOfChange = useCallback(
      (newOneOfIndex: string | null) => {
        if (newOneOfIndex !== null) {
          const newIndexNumber = Number.parseInt(newOneOfIndex, 10);

          if (newIndexNumber !== selectedIndex) {
            setNewSelectedIndex(newIndexNumber);
            openNewTab(newIndexNumber);
          }
        }
        // if (isEmpty(data)) {
        //   openNewTab(newIndexNumber);
        // } else {
        //   setOpen(true);
        // }
      },
      [openNewTab, selectedIndex]
    );

    return (
      <Stack gap="sm">
        <CombinatorProperties
          schema={schema}
          combinatorKeyword="oneOf"
          path={path}
        />
        <Select
          checkIconPosition="right"
          data={oneOfRenderInfos.map((oneOfRenderInfo, index) => ({
            value: index.toString(),
            label: oneOfRenderInfo.label,
          }))}
          value={selectedIndex.toString()}
          onChange={handleOneOfChange}
          label={label || 'One of'}
          allowDeselect={false}
        />
        {oneOfRenderInfos.map(
          (oneOfRenderInfo, oneOfIndex) =>
            selectedIndex === oneOfIndex && (
              <JsonFormsDispatch
                key={oneOfIndex}
                schema={oneOfRenderInfo.schema}
                uischema={oneOfRenderInfo.uischema}
                path={path}
                renderers={renderers}
                cells={cells}
              />
            )
        )}
        <Modal
          opened={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          title="Clear form?"
        >
          <Text>
            Your data will be cleared if you navigate away from this tab. Do you
            want to proceed?
          </Text>
          <Flex mt="xl" justify="flex-end" gap={16}>
            <Button onClick={cancel} color="primary">
              No
            </Button>
            <Button onClick={confirm} color="primary" autoFocus>
              Yes
            </Button>
          </Flex>
        </Modal>
      </Stack>
    );
  }
);

export const oneOfControlTester: RankedTester = rankWith(3, isOneOfControl);
