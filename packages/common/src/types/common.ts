export type JSONValue =
  | JSONObject
  | JSONValue[]
  | boolean
  | number
  | string
  | readonly JSONValue[]
  | null
  | undefined;

export type JSONObject = {
  [key: string]: JSONValue;
};

export type InitialData =
  | {
      children: InitialData;
      $type: string;
    }
  | { [key: string]: JSONValue };
