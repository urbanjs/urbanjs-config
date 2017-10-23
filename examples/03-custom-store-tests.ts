import * as expect from 'assert';

const TEST_FILE = `${__dirname}/03-custom-store.ts`;

describe('urbanjs-config - custom store', () => {
  let env: NodeJS.ProcessEnv;
  beforeEach(() => {
    env = {...process.env};
    delete require.cache[TEST_FILE];
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when no environment variable is set', () => {
    it('default configuration is returned', () => {
      expect.deepEqual(require(TEST_FILE).config, {
        valueA: 'string',
        valueB: 'string2'
      });
    });
  });

  describe('when environment variable is set', () => {
    beforeEach(() => {
      process.env.MY_APP__VALUE = 'string2';
    });

    it('default configuration is returned (process.env is ignored)', () => {
      expect.deepEqual(require(TEST_FILE).config, {
        valueA: 'string',
        valueB: 'string2'
      });
    });
  });
});
