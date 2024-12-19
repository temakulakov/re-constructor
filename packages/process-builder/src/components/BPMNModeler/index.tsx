'use client';

import {
  useRef,
  useEffect,
  MouseEventHandler,
  memo,
  forwardRef,
  ForwardedRef,
} from 'react';
import Modeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';
import { ImportXMLError } from 'bpmn-js/lib/BaseViewer';
import { Button } from '@mantine/core';
import {
  customPropertiesProviderModule,
  customModdleDescriptor,
} from './properties';
// import { customRenderer } from './renderers';
import { Process } from '~types';

import classes from './Renderer.module.css';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'camunda-bpmn-js/dist/assets/camunda-platform-modeler.css';

type BPMNModelerProps = Pick<Process, 'schema' | 'name'> & {
  saveProcess: (value: Process['schema']) => void;
  deleteProcess: () => void;
  reloadProcess: () => void;
};

type CanvasProps = {
  zoom: (property: string) => void;
};

const getRefValue = <T,>(ref: ForwardedRef<T>) => {
  if (ref && 'current' in ref) {
    return ref.current;
  }

  return null;
};

const saveValueToRef = <T,>(value: T, ref: ForwardedRef<T>) => {
  if (!ref) {
    return;
  }

  if ('current' in ref) {
    ref.current = value;
    return;
  }

  ref(value);
};

async function saveFile(file: string, name?: string) {
  if ('showSaveFilePicker' in window) {
    const fileBlob = new Blob([file], { type: 'text/xml' });
    // create a new handle
    const newHandle = await window.showSaveFilePicker({
      suggestedName: `${name || 'process'}.xml`,
    });

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write(fileBlob);

    // close the file and write the contents to disk.
    await writableStream.close();
  }
}

async function importXML(viewer: Modeler, processXML: string) {
  try {
    const result = await viewer.importXML(processXML);
    const { warnings } = result;

    if (warnings && warnings.length) {
      console.log('xml successfully imported!', warnings);
    }

    (viewer.get('canvas') as CanvasProps)?.zoom('fit-viewport');
  } catch (error) {
    const { warnings, message } = error as ImportXMLError;

    if (message || (warnings && warnings.length)) {
      console.log('something went wrong durint xml import:', warnings, message);
    }
  }
}

export const _BPMNModeler = forwardRef<Modeler, BPMNModelerProps>(
  ({ schema, name, saveProcess, reloadProcess, deleteProcess }, modelerRef) => {
    const containerRef = useRef(null);
    const isProcessLoaded = useRef<boolean>(false);
    const prevSchemaData = useRef<BPMNModelerProps['schema']>(schema);

    useEffect(() => {
      if (containerRef.current && !isProcessLoaded.current) {
        isProcessLoaded.current = true;

        const viewer = new Modeler({
          container: '#canvas',
          keyboard: {
            bindTo: window,
          },
          propertiesPanel: {
            parent: '#js-properties-panel',
          },
          additionalModules: [
            customPropertiesProviderModule,
            // customRenderer
          ],
          moddleExtensions: {
            custom: customModdleDescriptor,
          },
        });

        saveValueToRef(viewer, modelerRef);

        importXML(viewer, schema);
      }
    }, [schema, modelerRef]);

    useEffect(() => {
      const refValue = getRefValue(modelerRef);

      if (
        schema &&
        prevSchemaData.current !== schema &&
        refValue &&
        isProcessLoaded.current
      ) {
        importXML(refValue, schema);
        prevSchemaData.current = schema;
      }
    }, [schema, modelerRef]);

    const handleSaveProcess: MouseEventHandler<
      HTMLButtonElement
    > = async () => {
      const refValue = getRefValue(modelerRef);

      if (refValue) {
        try {
          const result = await refValue.saveXML({ format: true });

          if (result.xml) {
            console.log('SAVING DIAGRAM', result.xml);
            saveProcess(result.xml);
          }
        } catch (err) {
          console.error('could not save BPMN 2.0 diagram', err);
        }
      }
    };

    const handleDownloadProcess = async () => {
      const refValue = getRefValue(modelerRef);

      if (refValue) {
        try {
          const result = await refValue.saveXML({ format: true });

          if (result.xml) {
            console.log('DOWNLOADING DIAGRAM', result.xml);
            await saveFile(result.xml, name);
          }
        } catch (err) {
          console.error('could not save BPMN 2.0 diagram', err);
        }
      }
    };

    return (
      <div className={classes.wrapper}>
        <div id="canvas" className={classes.canvas} ref={containerRef} />
        <div className={classes['button-block']}>
          <Button type="button" onClick={handleSaveProcess}>
            Save
          </Button>
          <Button type="button" onClick={handleDownloadProcess}>
            Download
          </Button>
          <Button type="button" onClick={reloadProcess}>
            Reload
          </Button>
          <Button type="button" onClick={deleteProcess}>
            Delete
          </Button>
        </div>
        <div id="js-properties-panel" className={classes.panel} />
      </div>
    );
  }
);

export const BPMNModeler = memo(_BPMNModeler);
