export const customModdleDescriptor = {
  name: 'custom',
  prefix: 'custom',
  uri: 'http://custom',
  xml: {
    tagAlias: 'lowerCase',
  },
  associations: [],
  types: [
    {
      name: 'CustomTypes',
      extends: ['bpmn:StartEvent', 'bpmn:UserTask'],
      properties: [
        {
          name: 'formId',
          isAttr: true,
          type: 'String',
        },
      ],
    },
  ],
};
