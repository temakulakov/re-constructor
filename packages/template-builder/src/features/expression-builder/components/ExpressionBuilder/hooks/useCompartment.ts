import { Compartment, Extension, StateEffect } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { RefObject, useMemo, useEffect, useRef } from 'react';

/**
 * Helper hook for extensions that depend on on some input props.
 * With this hook the extension is isolated in a compartment so it can be
 * updated without reconfiguring the whole editor. The return value is
 * stable and should be included in the initial set of extensions.
 * On rerender the hook will update the extension if it changed by
 * dispatching an effect to editorRef.
 *
 * Use `useMemo` to compute the extension from some input:
 *
 * const extension = useCompartment(
 *   editorRef,
 *   useMemo(() => EditorView.darkTheme(isLightTheme === false), [isLightTheme])
 * )
 * const editor = useCodeMirror(..., ..., extension)
 *
 *
 * @param editorRef - Ref object to the editor instance
 * @param extension - the dynamic extension(s) to add to the editor
 * @returns a compartmentalized extension
 */
export function useCompartment(
  editorRef: RefObject<EditorView>,
  extension: Extension,
  extender?: (view: EditorView) => StateEffect<unknown>[]
): Extension {
  const compartment = useMemo(() => new Compartment(), []);
  // We only want to trigger CodeMirror transactions when the component updates,
  // not on the first render.
  const shouldUpdate = useRef(false);

  useEffect(() => {
    const view = editorRef.current;
    if (view && compartment.get(view.state) !== extension) {
      view.dispatch({
        effects: [
          compartment.reconfigure(extension),
          ...(extender?.(view) ?? []),
        ],
      });
    }
  }, [shouldUpdate, compartment, editorRef, extension, extender]);

  // The compartment is initialized only in the first render.
  // In subsequent renders we dispatch effects to update the compartment (
  // see below).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialExtension = useMemo(
    () => compartment.of(extension),
    [compartment]
  );

  return initialExtension;
}
