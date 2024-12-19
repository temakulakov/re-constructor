import { getDynamicValue } from './dynamicConverter';
import { EVALUATION_TYPE } from './types';
import { hasDynamicStringSnippet } from './utils';
import { isWrapperCode, realInputValueWithScript } from './valueConverter';

export const IGNORE_AUTO_RUN_WITH_RUN_SCRIPT_ATTR_RULES = [
  /events\[\d+\]\.script/,
  /content\.successEvent\[\d+\]\.script/,
  /content\.failedEvent\[\d+\]\.script/,
];

export const isRunScriptAttr = (attrPath: string) => {
  return IGNORE_AUTO_RUN_WITH_RUN_SCRIPT_ATTR_RULES.some((rule) => {
    return rule.test(attrPath);
  });
};

export const evaluateDynamicString = (
  keyInDataTree: string,
  dynamicString: string,
  dataTree: Record<string, any>,
  evaluationType: EVALUATION_TYPE = EVALUATION_TYPE.SMART_SUBSTITUTE
) => {
  const requiresEval = hasDynamicStringSnippet(dynamicString);
  let evalResult;
  if (requiresEval) {
    if (isRunScriptAttr(keyInDataTree) && isWrapperCode(dynamicString)) {
      evalResult = realInputValueWithScript(dynamicString, true);
    } else {
      try {
        const result = getDynamicValue(dynamicString, dataTree, evaluationType);
        evalResult = result?.result;
      } catch (error) {
        evalResult = undefined;
        throw error;
      }
    }
  } else {
    evalResult = dynamicString;
  }
  return evalResult;
};

export const evaluateDynamicStringAndGetCalcContext = (
  keyInDataTree: string,
  dynamicString: string,
  dataTree: Record<string, any>,
  evaluationType: EVALUATION_TYPE = EVALUATION_TYPE.TEMPLATE
) => {
  const requiresEval = hasDynamicStringSnippet(dynamicString);
  let evalResult;
  let context: Record<string, unknown> = {};
  if (requiresEval) {
    if (isRunScriptAttr(keyInDataTree) && isWrapperCode(dynamicString)) {
      evalResult = realInputValueWithScript(dynamicString, true);
    } else {
      try {
        const result = getDynamicValue(dynamicString, dataTree, evaluationType);
        evalResult = result?.result;
        context = result?.context || {};
      } catch (error) {
        evalResult = undefined;
        context = {};
        throw error;
      }
    }
  } else {
    evalResult = dynamicString;
  }
  return {
    result: evalResult,
    context,
  };
};
