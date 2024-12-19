import {
  CompletionContext,
  CompletionResult,
  acceptCompletion,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  closeCompletion,
  moveCompletionSelection,
} from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { html, htmlCompletionSource } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { Extension, Prec } from '@codemirror/state';
import { dropCursor, keymap, lineNumbers, tooltips } from '@codemirror/view';
import { useMemo } from 'react';

import { RuntimePropsCollectorInstance } from '~features/expression-builder/utils/executionTreeHelper/runtimePropsCollector';
import { isObject } from '~features/expression-builder/utils/typeHelper';
import { ternSeverCompletionSource } from './completionSources/TernServer';
import { buildContextCompletionSource } from './completionSources/illaContext';
import { getHighlightExpressionExtension } from './highlightJSExpression';
import { CODE_LANG, CODE_TYPE, ICodeMirrorOptions } from './types';

export const basicExtension: Extension = [
  history(),
  dropCursor(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
];

const buildCompletionSources = (
  codeType: CODE_TYPE,
  lang: CODE_LANG,
  canShowCompleteInfo: boolean,
  executedResult: Record<string, unknown>
) => {
  const ternSource = ternSeverCompletionSource(canShowCompleteInfo, codeType);
  const sources = buildContextCompletionSource(
    canShowCompleteInfo,
    codeType,
    executedResult
  );
  const completionSources = [ternSource, sources];

  switch (lang) {
    case CODE_LANG.HTML: {
      completionSources.push(htmlCompletionSource);
      break;
    }

    default: {
      break;
    }
  }
  return completionSources;
};

const keyMapExtensions = Prec.highest(
  keymap.of([
    { key: 'Escape', run: closeCompletion },
    { key: 'ArrowDown', run: moveCompletionSelection(true) },
    { key: 'ArrowUp', run: moveCompletionSelection(false) },
    { key: 'PageDown', run: moveCompletionSelection(true, 'page') },
    { key: 'PageUp', run: moveCompletionSelection(false, 'page') },
    { key: 'Tab', run: acceptCompletion },
    { key: 'Enter', run: acceptCompletion },
  ])
);

const getAutoCompletionExtension = (
  codeType: CODE_TYPE,
  lang: CODE_LANG,
  canShowCompleteInfo: boolean,
  executedResult: Record<string, unknown>
) => {
  const completionSources = buildCompletionSources(
    codeType,
    lang,
    canShowCompleteInfo,
    executedResult
  );
  return [
    autocompletion({
      override: completionSources,
      defaultKeymap: false,
      closeOnBlur: false,
    }),
    keyMapExtensions,
  ];
};

export const useBasicSetup = ({
  showLineNumbers,
  lang = CODE_LANG.JAVASCRIPT,
  codeType = CODE_TYPE.EXPRESSION,
  canShowCompleteInfo = false,
  expressions = [],
  scopeOfAutoComplete = 'global',
}: ICodeMirrorOptions) => {
  const executedResult = RuntimePropsCollectorInstance.getGlobalCalcContext();

  const autocompletionExtension = useMemo(
    () =>
      getAutoCompletionExtension(
        codeType,
        lang,
        canShowCompleteInfo,
        executedResult
      ),
    [canShowCompleteInfo, codeType, executedResult, lang]
  );

  const showLineNumberExtension = useMemo(
    () => (showLineNumbers ? [lineNumbers()] : []),
    [showLineNumbers]
  );

  const langExtension = useMemo(() => {
    const plugins: Extension[] = [
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    ];
    switch (lang) {
      case CODE_LANG.HTML: {
        plugins.push(html());
        break;
      }
      case CODE_LANG.JSON: {
        plugins.push(json());
        break;
      }
      case CODE_LANG.XML: {
        plugins.push(xml());
        break;
      }
      case CODE_LANG.JAVASCRIPT:
      default: {
        plugins.push(javascript());
        break;
      }
    }
    return plugins;
  }, [lang]);

  const highlightJSExpressionExtension = useMemo(() => {
    const isFunction = codeType === CODE_TYPE.FUNCTION;
    return isFunction ? [] : getHighlightExpressionExtension(expressions);
  }, [codeType, expressions]);

  const tooltipExtension = useMemo(() => {
    return tooltips({
      position: 'absolute',
      parent:
        document.querySelector<HTMLElement>('.codeMirrorWrapper') ||
        document.body,
    });
  }, []);

  const extensions = useMemo(
    () => [
      basicExtension,
      showLineNumberExtension,
      langExtension,
      autocompletionExtension,
      highlightJSExpressionExtension,
      tooltipExtension,
    ],
    [
      showLineNumberExtension,
      langExtension,
      autocompletionExtension,
      highlightJSExpressionExtension,
      tooltipExtension,
    ]
  );

  return extensions;
};
