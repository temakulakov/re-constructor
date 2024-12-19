import { JSONObject } from '@finch-cloud/common';
import { JsonSchema, UISchema } from '@finch-cloud/form-builder';
import { widgets } from '@finch-cloud/react-renderer';

export type BuilderComponent = {
  name: string;
  label: string;
  icon: React.ComponentType;
  canHaveChildren?: boolean;
  component: React.Component;
  childRequirements?: {
    /** Simple way to say children must be a specific component name */
    component?: string;
    /**
     * More advanced - specify a MongoDB-style query (using sift.js github.com/crcn/sift.js)
     * of what the children objects should match, e.g.
     *
     * @example
     *  query: {
     *    // Child of this element must be a 'Button' or 'Text' component
     *    'component.name': { $in: ['Button', 'Text'] }
     *  }
     */
    query?: JSONObject;
  };
  inputs: {
    schema: JsonSchema;
    uiSchema?: UISchema;
  };
};

export type Id = number;

export type Node = {
  name: string;
  data?: JSONObject;
  children?: Node[];
  dynamicProps?: Record<string, string>;
};

export type NodeTree = Node;

export type NormalizedNode = {
  id: Id;
  parentId?: Id | null;
  name: keyof typeof widgets;
  data?: JSONObject;
  dynamicProps?: Record<string, string>;
  childrenIds?: Id[];
};
