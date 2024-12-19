import { closeCompletion } from '@codemirror/autocomplete';
import {
  Compartment,
  EditorState,
  Extension,
  StateEffect,
} from '@codemirror/state';
import {
  EditorView,
  placeholder as placeholderExtension,
} from '@codemirror/view';
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'clsx';

import { VALIDATION_TYPES } from '~features/expression-builder/utils/validationFactory';
import { useBasicSetup } from './extensions';
import { CODE_LANG, CODE_TYPE, ICodeMirrorOptions } from './extensions/types';
import { HintTooltip, HintTooltipProps } from '../HintTooltip';
import classes from './BaseCodeMirrorInput.module.css';

export type BaseCodeMirrorInputProps = ICodeMirrorOptions &
  Omit<HintTooltipProps, 'isEditorFocused' | 'children'> & {
    extensions?: Extension[];
    value?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: (value: string) => void;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    editable?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
    tooltipContainer?: RefObject<HTMLDivElement | null>;
  };

// ReactCodeMirror:https://github.com/uiwjs/react-codemirror
export const BaseCodeMirrorInput = ({
  className,
  extensions = [],
  value,
  height = '',
  maxHeight = '',
  minHeight = '',
  width = '',
  maxWidth = '',
  minWidth = '',
  editable = true,
  readOnly = false,
  placeholder,
  showLineNumbers = false,
  lang = CODE_LANG.JAVASCRIPT,
  codeType = CODE_TYPE.EXPRESSION,
  expressions = [],
  result = '',
  hasError = false,
  resultType = VALIDATION_TYPES.STRING,
  canShowCompleteInfo = false,
  singleLine,
  onChange,
  onBlur,
  onFocus,
  scopeOfAutoComplete,
}: BaseCodeMirrorInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const editorViewRef = useRef<EditorView>();
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);
  const compartmentsRef = useRef<Compartment[]>([]);

  const extensionOptions = useMemo(() => {
    return {
      showLineNumbers,
      lang,
      codeType,
      expressions,
      canShowCompleteInfo,
      scopeOfAutoComplete,
    };
  }, [
    canShowCompleteInfo,
    codeType,
    expressions,
    lang,
    showLineNumbers,
    scopeOfAutoComplete,
  ]);

  const basicExtensions = useBasicSetup(extensionOptions);

  const defaultThemeOption = useMemo(
    () =>
      EditorView.theme({
        '&': {
          height,
          minHeight,
          maxHeight,
          width,
          maxWidth,
          minWidth,
        },
      }),
    [height, maxHeight, maxWidth, minHeight, minWidth, width]
  );

  const focusUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      if (viewUpdate.focusChanged) {
        setIsFocused(viewUpdate.view.hasFocus);
        const currentString = viewUpdate.state.doc.toString();

        if (viewUpdate.view.hasFocus) {
          onFocus?.();
        } else {
          onBlur?.(currentString);
        }
        // TODO
        // if (!viewUpdate.view.hasFocus) {
        //   setTimeout(() => {
        //     closeCompletion(viewUpdate.view);
        //   }, 500);
        // }
      }
    });
  }, [onBlur, onFocus]);

  const changeUpdateListener: Extension = useMemo(() => {
    return EditorView.updateListener.of((viewUpdate) => {
      const currentString = viewUpdate.state.doc.toString();

      if (viewUpdate.docChanged) {
        onChange?.(currentString);
      }
    });
  }, [onChange]);

  const readOnlyStateChangeEffect: Extension = useMemo(
    () => EditorState.readOnly.of(readOnly),
    [readOnly]
  );

  const editableStateChangeEffect: Extension = useMemo(
    () => EditorView.editable.of(editable),
    [editable]
  );

  const placeholderExt: Extension = useMemo(() => {
    return typeof placeholder === 'string'
      ? placeholderExtension(placeholder)
      : [];
  }, [placeholder]);

  const singleLineExt: Extension = useMemo(() => {
    return singleLine
      ? EditorState.transactionFilter.of((tr) => {
          return tr.newDoc.lines > 1 ? [] : [tr];
        })
      : EditorView.lineWrapping;
  }, [singleLine]);

  const allExtensions = useMemo(() => {
    return [
      basicExtensions,
      defaultThemeOption,
      focusUpdateListener,
      changeUpdateListener,
      readOnlyStateChangeEffect,
      editableStateChangeEffect,
      placeholderExt,
      singleLineExt,
      extensions,
    ];
  }, [
    basicExtensions,
    defaultThemeOption,
    focusUpdateListener,
    changeUpdateListener,
    readOnlyStateChangeEffect,
    editableStateChangeEffect,
    placeholderExt,
    singleLineExt,
    extensions,
  ]);

  const extensionsWithCompartment = useMemo(() => {
    for (
      let i = compartmentsRef.current.length;
      i < allExtensions.length;
      i++
    ) {
      const compartment = new Compartment();
      compartmentsRef.current.push(compartment);
    }
    return allExtensions.map((ext, index) =>
      compartmentsRef.current[index].of(ext)
    );
  }, [allExtensions]);

  useEffect(() => {
    if (
      !editorViewRef.current ||
      (!isFocused && value !== editorViewRef.current.state.doc.toString())
    ) {
      const state = EditorState.create({
        doc: value,
        extensions: extensionsWithCompartment,
      });
      if (editorViewRef.current) {
        editorViewRef.current.setState(state);
      } else if (editorWrapperRef.current) {
        editorViewRef.current = new EditorView({
          state,
          parent: editorWrapperRef.current,
        });
      }
    }
  }, [value, extensionsWithCompartment, isFocused]);

  const reconfigure = useCallback(
    (view?: EditorView) => {
      if (view) {
        const effects: StateEffect<unknown>[] = [];
        allExtensions.forEach((e, i) => {
          if (compartmentsRef.current[i].get(view.state) !== e) {
            effects.push(compartmentsRef.current[i].reconfigure(e));
          }
        });
        if (effects.length > 0) {
          view.dispatch({ effects });
        }
      }
    },
    [allExtensions]
  );

  useEffect(() => {
    if (editorViewRef.current) {
      reconfigure(editorViewRef.current);
    }
  }, [reconfigure]);

  return (
    <HintTooltip
      isEditorFocused={isFocused}
      result={!result ? '""' : result}
      hasError={hasError}
      resultType={resultType}
    >
      <div
        ref={editorWrapperRef}
        className={cx(
          classes.wrapper,
          hasError && classes.wrapper_error,
          isFocused && classes.wrapper_focused,
          (readOnly || !editable) && classes.wrapper_disabled,
          className
        )}
      />
    </HintTooltip>
  );
};
