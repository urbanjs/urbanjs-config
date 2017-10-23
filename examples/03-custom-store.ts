import { applyEnvironmentVariables } from '../dist'; // from 'urbanjs-config'

type Configuration = {
  valueA: string;
  valueB: string;
};

const defaults: Configuration = {
  valueA: 'string',
  valueB: 'string'
};

export const customStore = {
  MY_APP__VALUE_B: 'string2'
};

export const config =
  applyEnvironmentVariables<Configuration>(
    defaults,
    'MY_APP',
    customStore
  );
