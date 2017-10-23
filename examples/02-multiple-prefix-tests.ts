import * as expect from 'assert';

const TEST_FILE = `${__dirname}/02-multiple-prefix.ts`;

describe('urbanjs-config - multiple prefix', () => {
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
        value: 'string'
      });
    });
  });

  describe('when environment variable is set (MY_PREFIX_A)', () => {
    beforeEach(() => {
      process.env.MY_PREFIX_A__VALUE = 'prefixA';
    });

    it('config will be updated', () => {
      expect.deepEqual(require(TEST_FILE).config, {
        value: 'prefixA'
      });
    });
  });

  describe('when environment variables is set (MY_PREFIX_B)', () => {
    beforeEach(() => {
      process.env.MY_PREFIX_B__VALUE = 'prefixB';
    });

    it('config will be updated', () => {
      expect.deepEqual(require(TEST_FILE).config, {
        value: 'prefixB'
      });
    });
  });

  describe('when environment variables is set (both MY_PREFIX_A & MY_PREFIX_B)', () => {
    beforeEach(() => {
      process.env.MY_PREFIX_A__VALUE = 'prefixA';
      process.env.MY_PREFIX_B__VALUE = 'prefixB';
    });

    it('config will be updated', () => {
      expect.deepEqual(require(TEST_FILE).config, {
        value: 'prefixB'
      });
    });
  });
});
