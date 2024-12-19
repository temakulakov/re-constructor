import { JSONValue } from '~types/common';

export const getClipboardData = async (): Promise<JSONValue> => {
  const data = await navigator.clipboard.readText();
  return JSON.parse(data);
};
