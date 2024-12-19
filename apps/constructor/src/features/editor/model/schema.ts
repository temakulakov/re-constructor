import { JsonSchema } from '@finch-cloud/form-builder';

const commonFieldProperties = {
  name: {
    type: 'string',
    title: 'Name',
  },
  label: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
  required: {
    type: 'boolean',
  },
  readOnly: {
    type: 'boolean',
  },
};

const commonFieldRequired = ['name'];

const selectOptions = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      label: {
        type: 'string',
      },
      value: {
        type: 'string',
      },
    },
    required: ['value'],
  },
};

export const constructorSchema: JsonSchema = {
  definitions: {
    TextInput: {
      type: 'object',
      title: 'TextInput',
      properties: {
        type: { type: 'string', const: 'TextInput', default: 'TextInput' },
        ...commonFieldProperties,
        placeholder: {
          type: 'string',
        },
        minLength: {
          type: 'number',
        },
        maxLength: {
          type: 'number',
        },
      },
      required: [...commonFieldRequired],
    },
    NumberInput: {
      type: 'object',
      title: 'NumberInput',
      properties: {
        type: { type: 'string', const: 'NumberInput', default: 'NumberInput' },
        ...commonFieldProperties,
        placeholder: {
          type: 'string',
        },
        minimum: {
          type: 'number',
        },
        maximum: {
          type: 'number',
        },
      },
      required: [...commonFieldRequired],
    },
    Slider: {
      type: 'object',
      title: 'Slider',
      properties: {
        type: { type: 'string', const: 'Slider', default: 'Slider' },
        ...commonFieldProperties,
        minimum: {
          type: 'number',
        },
        maximum: {
          type: 'number',
        },
      },
      required: [...commonFieldRequired],
    },
    // MultiSelect: {
    //   type: 'object',
    //   title: 'MultiSelect',
    //   properties: {
    //     type: { type: 'string', const: 'MultiSelect', default: 'MultiSelect' },
    //     ...commonFieldProperties,
    //     options: selectOptions,
    //   },
    //   required: [...commonFieldRequired],
    // },
    Checkbox: {
      type: 'object',
      title: 'Checkbox',
      properties: {
        type: { type: 'string', const: 'Checkbox', default: 'Checkbox' },
        ...commonFieldProperties,
      },
      required: [...commonFieldRequired],
    },
    DateInput: {
      type: 'object',
      title: 'DateInput',
      properties: {
        type: { type: 'string', const: 'DateInput', default: 'DateInput' },
        ...commonFieldProperties,
        placeholder: {
          type: 'string',
        },
      },
      required: [...commonFieldRequired],
    },
    FileInput: {
      type: 'object',
      title: 'FileInput',
      properties: {
        type: { type: 'string', const: 'FileInput', default: 'FileInput' },
        ...commonFieldProperties,
        multiple: {
          type: 'boolean',
        },
        placeholder: {
          type: 'string',
        },
        uploadUrl: {
          type: 'string',
        },
        accept: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: [...commonFieldRequired],
    },
    Textarea: {
      type: 'object',
      title: 'Textarea',
      properties: {
        type: { type: 'string', const: 'Textarea' },
        ...commonFieldProperties,
        placeholder: {
          type: 'string',
        },
      },
      required: [...commonFieldRequired],
    },
    Select: {
      type: 'object',
      title: 'Select',
      properties: {
        type: { type: 'string', const: 'Select', default: 'Select' },
        ...commonFieldProperties,
        multiple: {
          type: 'boolean',
        },
        searchable: {
          type: 'boolean',
        },
        mode: {
          title: 'Mode',
          oneOf: [
            {
              title: 'Manual options',
              type: 'object',
              properties: {
                options: selectOptions,
                type: { type: 'string', const: 'manual', default: 'manual' },
              },
            },
            {
              title: 'Mapped',
              type: 'object',
              properties: {
                url: { type: 'string' },
                type: { type: 'string', const: 'mapped', default: 'mapped' },
              },
            },
          ],
        },
      },
      required: [...commonFieldRequired],
    },
    RadioGroup: {
      type: 'object',
      title: 'RadioGroup',
      properties: {
        type: { type: 'string', const: 'RadioGroup', default: 'RadioGroup' },
        ...commonFieldProperties,
        options: selectOptions,
      },
      required: [...commonFieldRequired],
    },
  },
  type: 'object',
  required: ['fields'],
  properties: {
    fields: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: {
            title: 'Field type',
            oneOf: [
              {
                $ref: '#/definitions/TextInput',
                title: 'Text Input',
              },
              {
                $ref: '#/definitions/NumberInput',
                title: 'Number Input',
              },
              {
                $ref: '#/definitions/Slider',
                title: 'Slider',
              },
              {
                $ref: '#/definitions/DateInput',
                title: 'Date Input',
              },
              {
                $ref: '#/definitions/FileInput',
                title: 'File Input',
              },
              {
                $ref: '#/definitions/Textarea',
                title: 'Textarea',
              },
              {
                $ref: '#/definitions/Checkbox',
                title: 'Checkbox',
              },
              {
                $ref: '#/definitions/RadioGroup',
                title: 'Radio Group',
              },
              {
                $ref: '#/definitions/Select',
                title: 'Select',
              },
              // {
              //   $ref: '#/definitions/MultiSelect',
              //   title: 'Multi Select',
              // },
            ],
          },
        },
      },
    },
  },
};

export const constructorUiSchema = {
  type: 'Control',
  scope: '#/properties/fields',
  options: { element: 'LayoutEditor' },
};
