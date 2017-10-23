import { resolveReferences } from '../dist'; // from 'urbanjs-config'

type Configuration = {
  port: number;
  serverOrigin: string;
};

const defaults: Configuration = {
  port: 3000,
  serverOrigin: 'http://localhost:{{port}}'
};

export const config =
  resolveReferences<Configuration>(
    defaults,
    (value: string, context: Configuration) =>
      value.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, key) => context[key])
  );
