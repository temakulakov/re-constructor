import debounce from 'lodash/debounce';
import { useMemo, useRef, useState } from 'react';
import cx from 'clsx';

import { useTemplateContext } from '~hooks/useTemplateContext';
import { evaluateDynamicString } from '../../utils/evaluateDynamicString';
import { getStringSnippets } from '../../utils/evaluateDynamicString/dynamicConverter';
import { isDynamicStringSnippet } from '../../utils/evaluateDynamicString/utils';
import { VALIDATION_TYPES } from '../../utils/validationFactory';
import { BaseCodeMirrorInput, BaseCodeMirrorInputProps } from './CodeMirror';
import { CODE_TYPE, IExpressionShape } from './CodeMirror/extensions/types';
import { githubLightScheme } from './CodeMirror/theme';
import { fixedValue } from './utils';
import classes from './ExpressionBuilder.module.css';
import './CmEditor.css';

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

const getShowResultType = (results: unknown[]) => {
  if (results.length === 0) {
    return VALIDATION_TYPES.STRING;
  }

  if (results.length === 1) {
    return getResultType(results[0]);
  }

  return VALIDATION_TYPES.STRING;
};

const getShowResult = (results: unknown[]) => {
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

export const MAX_LEN_WITH_SNIPPETS = 1024;

type ExpressionBuilderProps = Omit<
  BaseCodeMirrorInputProps,
  | 'hasError'
  | 'resultType'
  | 'result'
  | 'executionResult'
  | 'expressions'
  | 'canShowResultRealtime'
> & {
  expectValueType?: VALIDATION_TYPES;
  wrappedCodeFunc?: (value: string) => string;
  canExpand?: boolean;
};

export const ExpressionBuilder = ({
  value = '',
  onChange = () => {},
  showLineNumbers = false,
  placeholder,
  lang,
  width,
  maxWidth,
  height,
  maxHeight,
  editable = true,
  readOnly,
  extensions,
  expectValueType,
  codeType = CODE_TYPE.EXPRESSION,
  minWidth,
  minHeight,
  canShowCompleteInfo,
  className,
  singleLine,
  canExpand = true,
  scopeOfAutoComplete = 'global',
  wrappedCodeFunc,
  onBlur = () => {},
  onFocus = () => {},
}: ExpressionBuilderProps) => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [resultType, setResultType] = useState(VALIDATION_TYPES.STRING);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const calcContext = useTemplateContext();

  const stringSnippets = useMemo(() => {
    const result: IExpressionShape[] = [];
    const realInput = wrappedCodeFunc ? wrappedCodeFunc(value) : value;
    const dynamicStrings = getStringSnippets(realInput);
    const errors: string[] = [];
    const calcResultArray: unknown[] = [];
    const calcResultMap: Map<string, number[]> = new Map();

    dynamicStrings.forEach((dynamicString, index) => {
      if (isDynamicStringSnippet(dynamicString)) {
        try {
          calcResultArray.push(
            evaluateDynamicString('', dynamicString, calcContext)
          );
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

    if (errors.length > 0) {
      setError(true);
      setResult(errors[0]);

      return result;
    }

    const showResult = getShowResult(calcResultArray);
    const showResultType = getShowResultType(calcResultArray);

    setError(false);

    if (expectValueType) {
      setResultType(expectValueType);

      if (showResultType !== expectValueType && value) {
        dynamicStrings.forEach((dynamicString) => {
          if (
            dynamicString.length <= MAX_LEN_WITH_SNIPPETS &&
            isDynamicStringSnippet(dynamicString) &&
            calcResultMap.has(dynamicString)
          ) {
            const indexes = calcResultMap.get(dynamicString);
            indexes?.forEach((index) => {
              if (result[index]) {
                result[index].hasError = true;
              }
            });
          }
        });

        setResult(
          `Expect ${expectValueType}, but got ${showResultType}: ${showResult}`
        );
        setError(true);
      } else {
        setResult(
          showResult.length > MAX_LEN_WITH_SNIPPETS
            ? `${showResult.slice(0, MAX_LEN_WITH_SNIPPETS)}...`
            : showResult
        );
      }
    } else {
      setResultType(showResultType);
      setResult(
        showResult.length > MAX_LEN_WITH_SNIPPETS
          ? `${showResult.slice(0, MAX_LEN_WITH_SNIPPETS)}...`
          : showResult
      );
    }
    return result;
  }, [wrappedCodeFunc, value, expectValueType, calcContext]);

  const debounceHandleChange = useMemo(() => {
    return debounce(onChange, 200);
  }, [onChange]);

  const customExtensions = useMemo(
    () => (extensions ? [extensions, githubLightScheme] : [githubLightScheme]),
    [extensions]
  );

  return (
    <div className={cx(classes.wrapper, className)} ref={popupContainerRef}>
      <div className="codeMirrorWrapper" />
      <BaseCodeMirrorInput
        className={className}
        showLineNumbers={showLineNumbers}
        placeholder={placeholder}
        value={fixedValue(value)}
        onChange={debounceHandleChange}
        lang={lang}
        expressions={stringSnippets}
        result={result}
        hasError={error}
        resultType={resultType}
        width={width}
        maxWidth={maxWidth}
        height={height}
        maxHeight={maxHeight}
        editable={editable}
        readOnly={readOnly}
        codeType={codeType}
        extensions={customExtensions}
        minWidth={minWidth}
        minHeight={minHeight}
        canShowCompleteInfo={canShowCompleteInfo}
        singleLine={singleLine}
        tooltipContainer={popupContainerRef ?? undefined}
        scopeOfAutoComplete={scopeOfAutoComplete}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};
