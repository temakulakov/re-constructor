import { JSONValue, JSONObject } from '~types/common';
import { dataAttributes } from '~constants';

const propertiesToReplace: Record<string, keyof typeof dataAttributes> = {
  $id: 'id',
};

const isArrayData = (data: JSONValue): data is JSONValue[] =>
  typeof data === 'object' && Array.isArray(data);

const isObjectData = (data: JSONValue): data is JSONObject =>
  Boolean(typeof data === 'object' && data && !Array.isArray(data));

export const replacePropsWithDataAttributes = (data: JSONValue): JSONValue => {
  if (isArrayData(data)) {
    return data.map(replacePropsWithDataAttributes);
  }

  if (isObjectData(data)) {
    return Object.entries(data).reduce<Record<string, JSONValue>>(
      (acc, [key, value]) => {
        const newValue = replacePropsWithDataAttributes(value);

        if (key in propertiesToReplace) {
          acc[dataAttributes[propertiesToReplace[key]]] = newValue;
          return acc;
        }

        acc[key] = newValue;
        return acc;
      },
      {}
    );
  }

  return data;
};
