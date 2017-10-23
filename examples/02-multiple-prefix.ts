import { applyEnvironmentVariables } from '../dist'; // from 'urbanjs-config'

type Configuration = {
  value: string;
};

const defaults: Configuration = {
  value: 'string'
};

export const config =
  applyEnvironmentVariables<Configuration>(
    applyEnvironmentVariables<Configuration>(
      defaults,
      'MY_PREFIX_A'
    ),
    'MY_PREFIX_B'
  );
