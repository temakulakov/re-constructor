import {
  Completion,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import capitalize from 'lodash/capitalize';

import { AutocompleteDataType, checkCursorInDynamicFlag } from './TernServer';
import { CODE_TYPE } from '../types';
import {
  removeIgnoredKeys,
  removeWidgetOrActionMethods,
} from '~features/expression-builder/utils/executionTreeHelper/utils';
import {
  isFunction,
  isObject,
} from '~features/expression-builder/utils/typeHelper';
import { ContextDescription } from './ContextDescription';

const formatUtils = (data: unknown) => {
  if (isObject(data)) {
    return '#Object#';
  }
  if (Array.isArray(data)) {
    return '#Array#';
  }
  if (typeof data === 'string') {
    return `"${data.length > 50 ? `${data.slice(0, 50)}...` : data}"`;
  }
  if (typeof data === 'number' || typeof data === 'boolean') {
    return data;
  }
  if (typeof data === 'function') {
    return '#Function#';
  }
  if (data === null) {
    return 'null';
  }
  if (data === undefined) {
    return 'undefined';
  }
  return '#Unknown#';
};

const formatEvaluate = (data: any) => {
  let format = '';
  if (Array.isArray(data)) {
    if (data.length > 0) {
      format = '[<br/>';
      data.forEach((item) => {
        const showStr = formatUtils(item);
        format += `  ${showStr},<br/>`;
      });
    } else {
      format = '[';
    }
    format += ']';
  }
  if (isObject(data)) {
    format = 'Object {<br/>';
    Object.keys(data).forEach((key) => {
      const showStr = formatUtils(data[key]);
      format += `  ${key}: ${showStr},<br/>`;
    });
    format += '}';
  }
  return format;
};

export function getDataInfo(data: Record<string, unknown>, path: string) {
  let currentData: Record<string, unknown> = data;
  let offset: number = 0;
  let descInfos: Record<string, any> = {};

  for (let i = 0; i < path.length; i++) {
    switch (path[i]) {
      case '.':
      case '[':
      case ']':
        if (offset < i) {
          const currentPath = path.slice(offset, i).trim();
          currentData = currentData[currentPath] as Record<string, unknown>;
          if (!currentData || !isObject(currentData)) {
            return null;
          }
          descInfos = ContextDescription[currentPath] as Record<
            string,
            unknown
          >;
        }

        offset = i + 1;

        if (path[i] === '.' && Array.isArray(currentData)) {
          return null;
        }

        if (path[i] === '[' && !Array.isArray(currentData)) {
          return null;
        }
        break;
    }
  }
  return {
    currentData,
    descInfos,
    offset,
    prefix: path.slice(offset),
  };
}

export const buildContextCompletionSource = (
  canShowCompleteInfo: boolean,
  codeType: CODE_TYPE,
  executionResult: Record<string, unknown>
): ((
  context: CompletionContext
) => CompletionResult | Promise<CompletionResult | null> | null) => {
  const isFunction =
    codeType === CODE_TYPE.FUNCTION ||
    codeType === CODE_TYPE.NO_METHOD_FUNCTION;

  if (codeType === CODE_TYPE.FUNCTION) {
    executionResult = removeIgnoredKeys(executionResult);
  } else {
    executionResult = removeIgnoredKeys(
      removeWidgetOrActionMethods(executionResult)
    );
  }

  return (context: CompletionContext) => {
    const isCursorInDynamicFlag = checkCursorInDynamicFlag(context, isFunction);
    if (!isCursorInDynamicFlag) {
      return null;
    }
    const validString = context.matchBefore(/(\w+(\[\s*\d+\s*\])*\.)*\w*/);
    if (!validString) {
      return null;
    }
    if (
      validString.text.length === 0 &&
      (isFunction || context.matchBefore(/\{\{\s*/) === null)
    ) {
      return null;
    }

    const dataInfo = getDataInfo(executionResult, validString.text);

    if (!dataInfo) {
      return null;
    }

    const { currentData, offset, prefix, descInfos } = dataInfo;

    const keys = Object.keys(currentData).filter((key) =>
      key.startsWith(prefix)
    );

    const options = keys.map((key) => {
      const dataType = getDataType(currentData[key]);
      const currentKeyDesc = descInfos?.[key];
      const result: Completion = {
        type: dataType,
        label: key,
        detail: capitalize(dataType),
        boost: 1,
      };

      if (canShowCompleteInfo) {
        result.info = () => {
          const dom = document.createElement('span');
          dom.innerHTML = `<div class="completionInfoCardTitle">
        <span class="cardTitle">${key}</span>
      </div>
      <p class="completionInfoType">${
        currentKeyDesc ? currentKeyDesc.usage : dataType
      }</p>
      <p class="completionInfoEvaluatesTitle">Evaluates to</p>
${getDataEvaluatesToDom(currentData[key], dataType)}`;
          return dom;
        };
      }
      return result;
    });

    return {
      from: validString.from + offset,
      validFor: /^\w*$/,
      options,
    };
  };
};

function getDataType(data: unknown): AutocompleteDataType {
  const type = typeof data;

  if (type === 'number') {
    return AutocompleteDataType.NUMBER;
  }
  if (type === 'string') {
    return AutocompleteDataType.STRING;
  }
  if (type === 'boolean') {
    return AutocompleteDataType.BOOLEAN;
  }
  if (Array.isArray(data)) {
    return AutocompleteDataType.ARRAY;
  }
  if (isFunction(data)) {
    return AutocompleteDataType.FUNCTION;
  }
  if (type === 'undefined') {
    return AutocompleteDataType.UNKNOWN;
  }
  return AutocompleteDataType.OBJECT;
}

const getEvaluatesTooltipDOM = (data: Object | unknown[]) => {
  return `<div class="evaluatesTooltips">${formatEvaluate(data)}</div>`;
};

function getDataEvaluatesToDom(data: unknown, dataType: AutocompleteDataType) {
  switch (dataType) {
    case AutocompleteDataType.STRING:
      return `<span class="evaluatesResult">"${data}"</span>`;
    case AutocompleteDataType.NUMBER:
    case AutocompleteDataType.BOOLEAN:
      return `<span class="evaluatesResult">${data}</span>`;
    case AutocompleteDataType.ARRAY:
      return `<span class="evaluatesResult">[ ... ]${getEvaluatesTooltipDOM(
        data as unknown[]
      )}</span>`;
    case AutocompleteDataType.OBJECT:
      return `<span class="evaluatesResult">{ ... } ${getEvaluatesTooltipDOM(
        data as Object
      )}</span>`;
    default:
      return `<span class="evaluatesResult">null</span>`;
  }
}
