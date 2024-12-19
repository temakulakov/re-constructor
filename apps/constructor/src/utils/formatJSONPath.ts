const JSONPathSeparator = '.';

export const formatArrayToJSONPath = (array: string[]) =>
  array.join(JSONPathSeparator);

export const formatJSONPathToArray = (path: string) => path.split('.');
