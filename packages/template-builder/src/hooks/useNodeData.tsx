import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import {
  JSONObject,
  PropsConfig,
  useTemplateContextStore,
} from '@finch-cloud/common';
import { widgets } from '@finch-cloud/react-renderer';
import { evaluateDynamicString } from '~features/expression-builder/utils/evaluateDynamicString';
import { isDynamicStringSnippet } from '~features/expression-builder/utils/evaluateDynamicString/utils';
import { getStringSnippets } from '~features/expression-builder/utils/evaluateDynamicString/dynamicConverter';
import { useBuilderStore } from '~model/builderSlice';

import { VALIDATION_TYPES } from '~features/expression-builder';
import { InlineTextEditor } from '~components/InlineTextEditor';

const getResultType = (result: unknown) => {
  if (Array.isArray(result)) {
    return VALIDATION_TYPES.ARRAY;
  }

  if (typeof result === 'string') {
    return VALIDATION_TYPES.STRING;
  }

  if (typeof result === 'number') {
    return VALIDATION_TYPES.NUMBER;
  }

  if (typeof result === 'boolean') {
    return VALIDATION_TYPES.BOOLEAN;
  }

  if (typeof result === 'undefined') {
    return VALIDATION_TYPES.UNDEFINED;
  }

  return VALIDATION_TYPES.OBJECT;
};

const getShownResultType = (results: unknown[]) => {
  if (results.length === 0) {
    return VALIDATION_TYPES.STRING;
  }

  if (results.length === 1) {
    return getResultType(results[0]);
  }

  return VALIDATION_TYPES.STRING;
};

const getShownResult = (results: unknown[]) => {
  let calcResult: string = '';
  if (results.length === 0) {
    return '';
  }
  results.forEach((result) => {
    if (
      typeof result === 'string' ||
      typeof result === 'number' ||
      typeof result === 'boolean'
    ) {
      calcResult += result;
    } else if (result === undefined) {
      calcResult += result;
    } else {
      calcResult += JSON.stringify(result);
    }
  });

  return calcResult;
};

function findParentTemplate(id, state) {
  const { parentId } = state.nodesById[id];

  if (parentId === 0) {
    // TODO: pick up props from external page data
    return {};
  }

  if (node.name === widgets.TEMPLATE.config.name) {
    return node.data;
  }

  return findParentTemplate(parentId, state);
}

const evalPropValue = ({ value, context }) => {
  const result = [];
  const dynamicStrings = getStringSnippets(value);
  const errors: string[] = [];
  const calcResultArray: unknown[] = [];
  const calcResultMap: Map<string, number[]> = new Map();

  dynamicStrings.forEach((dynamicString, index) => {
    if (isDynamicStringSnippet(dynamicString)) {
      try {
        calcResultArray.push(evaluateDynamicString('', dynamicString, context));
        result.push({ value: dynamicString, hasError: false });

        if (calcResultMap.has(dynamicString)) {
          calcResultMap.get(dynamicString)?.push(index);
        } else {
          calcResultMap.set(dynamicString, [index]);
        }
      } catch (e) {
        errors.push((e as Error).message);
        result.push({ value: dynamicString, hasError: true });

        if (calcResultMap.has(dynamicString)) {
          calcResultMap.get(dynamicString)?.push(index);
        } else {
          calcResultMap.set(dynamicString, [index]);
        }
      }
    } else {
      calcResultArray.push(dynamicString);
    }
  });

  const shownResult = getShownResult(calcResultArray);
  const shownResultType = getShownResultType(calcResultArray);
  console.log({
    shownResult,
    shownResultType,
    errors,
    calcResultArray,
    result,
  });
  return shownResult;
};

type UseNodeDataProps = {
  props?: JSONObject;
  dynamicProps?: Record<string, string>;
  context: JSONObject;
  propsConfig?: PropsConfig;
};

export const useNodeData = ({
  props,
  dynamicProps,
  context,
  propsConfig,
}: UseNodeDataProps) => {
  const calcedProps = useMemo(() => {
    if (!props) {
      return props;
    }

    let finalProps = props;

    if (dynamicProps) {
      finalProps = Object.entries(props).reduce<JSONObject>(
        (acc, [propName, propValue]) => {
          const isDynamic = dynamicProps[propName];
          const value = isDynamic
            ? evalPropValue({ value: propValue, context })
            : propValue;
          acc[propName] = value;
          return acc;
        },
        {}
      );
    }

    if (propsConfig) {
      finalProps = Object.entries(finalProps).reduce<JSONObject>(
        (acc, [propName, propValue]) => {
          const propConfig = propsConfig.general.children.find(
            ({ name }) => name === propName
          );
          const isInlineEditable = propConfig?.inlineEditable ?? false;
          const value = isInlineEditable ? (
            <InlineTextEditor value={propValue as string} name={propName} />
          ) : (
            propValue
          );

          acc[propName] = value;

          return acc;
        },
        {}
      );
    }

    return finalProps;
  }, [dynamicProps, props, context, propsConfig]);

  return calcedProps;
};
