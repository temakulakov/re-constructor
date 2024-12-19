import { ZodSchema } from 'zod';

import { JSONObject } from '~types/common';

export type WidgetConfig = {
  name: string;
  label?: string;
  icon: React.ComponentType;
  defaultProps: JSONObject;
  canHaveChildren?: boolean;
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
};

export type PropInput = {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  validationSchema?: ZodSchema;
  renderer: string;
  inputProps?: JSONObject;
  inlineEditable?: boolean;
};

export type PropsConfig = Record<
  'general' | 'layout' | string,
  { children: PropInput[] }
>;
