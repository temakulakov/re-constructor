import merge from 'lodash/merge';
import get from 'lodash/get';
import {
  ComponentType,
  Dispatch,
  ReducerAction,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  JsonFormsDispatch,
  JsonFormsStateContext,
  withJsonFormsContext,
} from '@jsonforms/react';
import {
  composePaths,
  ControlElement,
  findUISchema,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  moveDown,
  moveUp,
  Resolve,
  update,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  getFirstPrimitiveProp,
  createId,
  removeId,
  ArrayTranslations,
} from '@jsonforms/core';
import { Accordion, ActionIcon, Flex, Group, Text } from '@mantine/core';
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from '@finch-cloud/common';

type OwnPropsOfExpandPanel = {
  enabled: boolean;
  index: number;
  path: string;
  uischema: ControlElement;
  schema: JsonSchema;
  expanded: boolean;
  renderers?: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
  uischemas?: JsonFormsUISchemaRegistryEntry[];
  rootSchema: JsonSchema;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
  config: any;
  childLabelProp?: string;
  handleExpansion(panel: string): (expanded: boolean) => void;
  translations: ArrayTranslations;
};

type StatePropsOfExpandPanel = OwnPropsOfExpandPanel & {
  childLabel: string;
  childPath: string;
  enableMoveUp: boolean;
  enableMoveDown: boolean;
};

/**
 * Dispatch props of a table control
 */
export type DispatchPropsOfExpandPanel = {
  removeItems(path: string, toDelete: number[]): (event: any) => void;
  moveUp(path: string, toMove: number): (event: any) => void;
  moveDown(path: string, toMove: number): (event: any) => void;
};

export interface ExpandPanelProps
  extends StatePropsOfExpandPanel,
    DispatchPropsOfExpandPanel {}

const ExpandPanelRendererComponent = (props: ExpandPanelProps) => {
  const [labelHtmlId] = useState<string>(createId('expand-panel'));

  useEffect(() => {
    return () => {
      removeId(labelHtmlId);
    };
  }, [labelHtmlId]);

  const {
    enabled,
    childLabel,
    childPath,
    index,
    expanded,
    moveDown,
    moveUp,
    enableMoveDown,
    enableMoveUp,
    handleExpansion,
    removeItems,
    path,
    rootSchema,
    schema,
    uischema,
    uischemas,
    renderers,
    cells,
    config,
    translations,
  } = props;

  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        undefined,
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  );

  if (schema.type === 'string' || schema.type === 'number') {
    return (
      <Flex justify="space-between" align="center" mt={12} gap={4}>
        <Text aria-label="Index">{index + 1}</Text>
        <JsonFormsDispatch
          enabled={enabled}
          schema={schema}
          uischema={foundUISchema}
          path={childPath}
          key={childPath}
          renderers={renderers}
          cells={cells}
        />
        {enabled && (
          <ActionIcon
            onClick={removeItems(path, [index])}
            aria-label={translations.removeAriaLabel}
            variant="subtle"
          >
            <CloseIcon />
          </ActionIcon>
        )}
      </Flex>
    );
  }

  return (
    <Accordion
      aria-labelledby={labelHtmlId}
      chevronPosition="left"
      value={expanded ? childPath : null}
      onChange={(newValue) => {
        handleExpansion(childPath)(Boolean(newValue));
      }}
    >
      <Accordion.Item value={childPath}>
        <Flex align="center">
          <Accordion.Control>
            <Flex justify="space-between">
              <Group>
                <Text aria-label="Index">{index + 1}</Text>
                <Text id={labelHtmlId}>{childLabel}</Text>
              </Group>
            </Flex>
          </Accordion.Control>
          <Flex style={{ flexShrink: 0 }}>
            <Group gap={8}>
              {enabled ? (
                <>
                  <ActionIcon
                    onClick={moveUp(path, index)}
                    disabled={!enableMoveUp}
                    aria-label={translations.upAriaLabel}
                    variant={!enableMoveUp ? 'transparent' : 'subtle'}
                  >
                    <ArrowUpIcon />
                  </ActionIcon>
                  <ActionIcon
                    onClick={moveDown(path, index)}
                    disabled={!enableMoveDown}
                    aria-label={translations.downAriaLabel}
                    variant={!enableMoveDown ? 'transparent' : 'subtle'}
                  >
                    <ArrowDownIcon />
                  </ActionIcon>
                </>
              ) : (
                ''
              )}
              {enabled && (
                <ActionIcon
                  onClick={removeItems(path, [index])}
                  aria-label={translations.removeAriaLabel}
                  variant="subtle"
                >
                  <CloseIcon />
                </ActionIcon>
              )}
            </Group>
          </Flex>
        </Flex>
        <Accordion.Panel>
          <JsonFormsDispatch
            enabled={enabled}
            schema={schema}
            uischema={foundUISchema}
            path={childPath}
            key={childPath}
            renderers={renderers}
            cells={cells}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

/**
 * Maps state to dispatch properties of an expand pandel control.
 *
 * @param dispatch the store's dispatch method
 * @returns {DispatchPropsOfArrayControl} dispatch props of an expand panel control
 */
export const ctxDispatchToExpandPanelProps: (
  dispatch: Dispatch<ReducerAction<any>>
) => DispatchPropsOfExpandPanel = (dispatch) => ({
  removeItems: useCallback(
    (path: string, toDelete: number[]) =>
      (event: MouseEvent): void => {
        event.stopPropagation();
        dispatch(
          update(path, (array) => {
            toDelete
              .sort()
              .reverse()
              .forEach((s) => array.splice(s, 1));
            return array;
          })
        );
      },
    [dispatch]
  ),
  moveUp: useCallback(
    (path: string, toMove: number) =>
      (event: MouseEvent): void => {
        event.stopPropagation();
        dispatch(
          update(path, (array) => {
            moveUp(array, toMove);
            return array;
          })
        );
      },
    [dispatch]
  ),
  moveDown: useCallback(
    (path: string, toMove: number) =>
      (event: MouseEvent): void => {
        event.stopPropagation();
        dispatch(
          update(path, (array) => {
            moveDown(array, toMove);
            return array;
          })
        );
      },
    [dispatch]
  ),
});

/**
 * Map state to control props.
 * @param state the JSON Forms state
 * @param ownProps any own props
 * @returns {StatePropsOfControl} state props for a control
 */
export const withContextToExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> =>
  function WithContextToExpandPanelProps({
    ctx,
    props,
  }: JsonFormsStateContext & ExpandPanelProps) {
    const dispatchProps = ctxDispatchToExpandPanelProps(ctx.dispatch);
    const { childLabelProp, schema, path, index, uischemas } = props;
    const childPath = composePaths(path, `${index}`);
    const childData = Resolve.data(ctx.core.data, childPath);
    const childLabel = childLabelProp
      ? get(childData, childLabelProp, '')
      : get(childData, getFirstPrimitiveProp(schema), '');

    return (
      <Component
        {...props}
        {...dispatchProps}
        childLabel={childLabel}
        childPath={childPath}
        uischemas={uischemas}
      />
    );
  };

export const withJsonFormsExpandPanelProps = (
  Component: ComponentType<ExpandPanelProps>
): ComponentType<OwnPropsOfExpandPanel> =>
  withJsonFormsContext(withContextToExpandPanelProps(Component));

export const ExpandPanelRenderer = withJsonFormsExpandPanelProps(
  ExpandPanelRendererComponent
);
