import {
  forwardRef,
  type MutableRefObject,
  type RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  type ChangeSpec,
  Compartment,
  EditorState,
  type EditorStateConfig,
  type Extension,
  StateEffect,
  type StateEffectType,
  StateField,
} from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const defaultTheme = EditorView.baseTheme({
  // Overwrites the default cursor color, which has too low contrast in dark mode
  '.theme-dark & .cm-cursor': {
    borderLeftColor: 'var(--grey-07)',
  },
});

/**
 * Create a {@link ChangeSpec} for replacing the current editor value. Returns `undefined` if the
 * new value is the same as the current value.
 */
export function replaceValue(
  view: EditorView,
  newValue: string
): ChangeSpec | undefined {
  const currentValue = view.state.sliceDoc() ?? '';
  if (currentValue === newValue) {
    return undefined;
  }

  return { from: 0, to: currentValue.length, insert: newValue };
}

/**
 * Hook for rendering and updating a CodeMirror instance.
 */
export function useCodeMirror(
  editorRef: MutableRefObject<EditorView | null>,
  containerRef: RefObject<HTMLDivElement | null>,
  value: string,
  extensions?: EditorStateConfig['extensions']
): void {
  const allExtensions = useMemo(
    () => [defaultTheme, extensions ?? []],
    [extensions]
  );

  // The order of effects is important here:
  //
  // - If the editor hasn't been created yet (editorRef.current is null) it should be
  //   fully instantiated with value and extensions. The value/extension update effects
  //   should not have any ... effect.
  // - When the hook runs on subsequent renders the value and extensions get update if
  //   the respective values changed.
  //
  // We achieve this by putting the update effects before the creation effect.

  // Update editor value if necessary
  useEffect(() => {
    if (editorRef.current) {
      const changes = replaceValue(editorRef.current, value ?? '');

      if (changes) {
        editorRef.current.dispatch({ changes });
      }
    }
  }, [editorRef, value]);

  // Reconfigure/update extensions if necessary
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.dispatch({
        effects: StateEffect.reconfigure.of(allExtensions),
      });
    }
  }, [editorRef, allExtensions]);

  // Create editor if necessary
  useEffect(() => {
    if (!editorRef.current && containerRef.current) {
      editorRef.current = new EditorView({
        state: EditorState.create({ doc: value, extensions: allExtensions }),
        parent: containerRef.current,
      });
    }
  }, [editorRef, containerRef, value, allExtensions]);

  // Clean up editor on unmount
  useEffect(
    () => () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    },
    [editorRef]
  );
}
