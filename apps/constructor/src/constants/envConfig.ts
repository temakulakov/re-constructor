type EnvProperties = {
  apiEndpoint: string;
  templateEndpoint: string;
};

export type EnvConfig = {
  isDev: boolean;
  setProperty: (configKey: keyof EnvProperties, configValue: string) => void;
} & EnvProperties;

const isDev = process.env.NODE_ENV === 'development';

export const envConfig: EnvConfig = {
  apiEndpoint: 'https://forms.dev.finch.fm/',
  templateEndpoint: 'http://localhost:3001',
  isDev,
  setProperty(configKey, configValue) {
    this[configKey] = configValue;
  },
};
