import { InitialData, JSONValue } from '~types/common';
import { ConstructorEventType, TemplateEventType } from '../constants/events';

const postMessage = (payload: unknown) =>
  window.parent.postMessage(payload, '*');

type TemplateMessages = {
  [TemplateEventType.OPEN_CONTEXT_MENU]: {
    type: TemplateEventType.OPEN_CONTEXT_MENU;
    payload: { id: number; x: number; y: number };
  };
  [TemplateEventType.TEMPLATE_MOUNTED]: {
    type: TemplateEventType.TEMPLATE_MOUNTED;
    payload: undefined;
  };
  [TemplateEventType.UPDATE_SCHEME]: {
    type: TemplateEventType.UPDATE_SCHEME;
    payload: { scheme: JSONValue };
  };
};

type ConstructorMessages = {
  [ConstructorEventType.SET_PREVIEW]: {
    type: ConstructorEventType.SET_PREVIEW;
    payload: InitialData | Record<string, unknown>;
  };
};

type IframeBusSingleton = {
  templateIframe: HTMLIFrameElement | null;
  setTemplateIframe: (templateIframe: HTMLIFrameElement) => void;
  sendToTemplate: <T extends ConstructorEventType>({
    type,
    payload,
  }: {
    type: T;
    payload: ConstructorMessages[T]['payload'];
  }) => void;
  subscribeToTemplate: (
    listener: (
      message: MessageEvent<TemplateMessages[keyof TemplateMessages]>
    ) => void
  ) => () => void;
  sendToConstructor: <T extends TemplateEventType>(
    type: T,
    payload?: TemplateMessages[T]['payload']
  ) => void;
  subscribeToConstructor: (
    listener: (
      message: MessageEvent<ConstructorMessages[keyof ConstructorMessages]>
    ) => void
  ) => () => void;
};

export const IframeBus: IframeBusSingleton = {
  templateIframe: null,
  setTemplateIframe(templateIframe: HTMLIFrameElement) {
    this.templateIframe = templateIframe;
  },
  sendToTemplate({ type, payload }) {
    this.templateIframe?.contentWindow?.postMessage({ type, payload }, '*');
  },
  subscribeToTemplate: (listener) => {
    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  },
  sendToConstructor: (type, payload) => postMessage({ type, payload }),
  subscribeToConstructor: (listener) => {
    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  },
};
