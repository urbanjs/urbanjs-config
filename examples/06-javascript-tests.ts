import * as expect from 'assert';

const TEST_FILE = `${__dirname}/06-javascript.js`;

describe('urbanjs-config - javascript', () => {
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
      expect.deepEqual(require(TEST_FILE), {
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
      expect.deepEqual(require(TEST_FILE), {
        port: 3001,
        serverOrigin: 'http://localhost:3001',
        useSecureCookies: true
      });
    });
  });
});
