import { JSONObject, JSONValue } from '@finch-cloud/common';

export const isComplexNodeData = (
  data: JSONValue
): data is JSONObject | JSONValue[] =>
  Boolean(data && typeof data === 'object');

export const isObjectNodeData = (data: JSONValue): data is JSONObject =>
  data !== null && typeof data === 'object' && !Array.isArray(data);

export const isValidNodeData = (data: JSONValue): data is JSONObject | null =>
  typeof data === 'object' && !Array.isArray(data);
