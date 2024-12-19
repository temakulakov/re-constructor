import { html } from 'htm/preact';
import { Element } from 'bpmn-js';
import {
  useEffect,
  useState,
  useRef,
} from '@bpmn-io/properties-panel/preact/hooks';
import { SelectEntry, isSelectEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';
import { getFormList } from '~model/services';
import { createNodeInstance, NodeInstance } from '~utils';
import { FormIdExtension } from './FormIdExtension';

type FormIdProps = {
  element: Element;
  id: string;
};

function FormId({ element, id }: FormIdProps) {
  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const [formIdList, setFormIdList] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mountElementRef = useRef<HTMLDivElement>(null);
  const nodeInstanceRef = useRef<NodeInstance | null>(null);

  const getValue = () => {
    return element.businessObject.formId || '';
  };

  const setValue = (value: string) => {
    setSelectedId(value);
    return modeling.updateProperties(element, {
      formId: value,
    });
  };

  useEffect(() => {
    if (mountElementRef.current) {
      nodeInstanceRef.current = createNodeInstance(mountElementRef.current);
    }

    return () => {
      if (nodeInstanceRef.current) {
        nodeInstanceRef.current.unmount();
      }
    };
  }, []);

  useEffect(() => {
    if (nodeInstanceRef.current && selectedId !== null) {
      nodeInstanceRef.current.render(<FormIdExtension id={selectedId} />);
    }
  }, [selectedId]);

  useEffect(() => {
    async function fetchFormIdList() {
      const data = await getFormList({ limit: 100, offset: 0 });

      if (data) {
        setFormIdList(data);
      }
    }

    fetchFormIdList();
  }, []);

  const getOptions = () => {
    return [
      { label: '<none>', value: undefined },
      ...formIdList.map(({ id: formId, name }) => ({
        label: name,
        value: formId,
      })),
    ];
  };
  return html`<div>
    <${SelectEntry}
      id=${id}
      element=${element}
      description=${translate('Choose form id')}
      label=${translate('Form Id')}
      getValue=${getValue}
      setValue=${setValue}
      getOptions=${getOptions}
      debounce=${debounce}
    />
    <div ref=${mountElementRef} />
  </div>`;
}

export function createFormIdEntries(element: Element) {
  return [
    {
      id: 'formId',
      element,
      component: FormId,
      isEdited: isSelectEntryEdited,
    },
  ];
}
