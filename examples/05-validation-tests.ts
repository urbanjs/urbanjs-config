import * as expect from 'assert';

const TEST_FILE = `${__dirname}/05-validation.ts`;

describe('urbanjs-config - validation', () => {
  let env: NodeJS.ProcessEnv;
  beforeEach(() => {
    env = {...process.env};
    delete require.cache[TEST_FILE];
  });

  afterEach(() => {
    process.env = env;
  });

  describe('when no environment variable is set', () => {
    it('default config is returned', () => {
      expect.deepEqual(require(TEST_FILE).config, {
        port: 3000,
        serverOrigin: 'http://localhost:3000',
        useSecureCookies: false
      });
    });
  });

  describe('when environment variable is set', () => {
    beforeEach(() => {
      process.env.MY_APP__PORT = '3001';
      process.env.MY_APP__USE_SECURE_COOKIES = 'true';
    });

    it('config will be updated', () => {
      expect.deepEqual(require(TEST_FILE).config, {
        port: 3001,
        serverOrigin: 'http://localhost:3001',
        useSecureCookies: true
      });
    });

    describe('and value is invalid', () => {
      beforeEach(() => {
        process.env.MY_APP__PORT = '2999';
      });

      it('throws', () => {
        expect.throws(
          () => require(TEST_FILE).config,
          (err) => /port should be >= 3000$/.test(err.message)
        );
      });
    });
  });
});
