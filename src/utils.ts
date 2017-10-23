export function toConstantCase(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]{2,})([a-z])/g, '$1_$2')
    .toUpperCase();
}

export function applyEnvironmentVariables<T extends object>(config: T,
                                                            envVariableRootPrefix?: string,
                                                            envVariableStore?: object): T {
  // default argument values cannot be used in node@4
  envVariableRootPrefix = envVariableRootPrefix || '';
  envVariableStore = envVariableStore || process.env;

  return (function next(data: object, envVariablePrefix: string) {
    const configuredData = {} as T;
    Object.keys(data).forEach((key) => {
      const processEnvKey = `${envVariablePrefix ? `${envVariablePrefix}__`
        : ''}${toConstantCase(key)}`;
      const value = data[key];

      if (typeof value === 'string') {
        configuredData[key] = envVariableStore.hasOwnProperty(processEnvKey)
          ? envVariableStore[processEnvKey]
          : value;
      } else if (typeof value === 'number') {
        configuredData[key] = envVariableStore.hasOwnProperty(processEnvKey)
          ? parseInt(`${envVariableStore[processEnvKey]}`, 10)
          : value;
      } else if (typeof value === 'boolean') {
        configuredData[key] = envVariableStore.hasOwnProperty(processEnvKey)
          ? /true/i.test(`${envVariableStore[processEnvKey]}`)
          : value;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        configuredData[key] = next(value, processEnvKey);
      } else {
        throw new Error('Invalid config');
      }
    });
    return configuredData;
  }(config, envVariableRootPrefix));
}
