export enum CODE_TYPE {
  'EXPRESSION' = 'EXPRESSION',
  'FUNCTION' = 'FUNCTION',
  'NO_METHOD_FUNCTION' = 'NO_METHOD_FUNCTION',
}

export enum CODE_LANG {
  'JAVASCRIPT' = 'javascript',
  'SQL' = 'sql',
  'HTML' = 'html',
  'JSON' = 'json',
  'XML' = 'xml',
  'PGSQL' = 'pgsql',
}

export type IExpressionShape = {
  value: string;
  hasError: boolean;
};

export type ICodeMirrorOptions = {
  showLineNumbers?: boolean;
  lang?: CODE_LANG;
  codeType?: CODE_TYPE;
  expressions?: IExpressionShape[];
  canShowCompleteInfo?: boolean;
  sqlScheme?: Record<string, unknown>;
  singleLine?: boolean;
  scopeOfAutoComplete?: 'global' | 'page';
};
