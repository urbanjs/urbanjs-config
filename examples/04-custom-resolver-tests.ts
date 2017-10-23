import * as expect from 'assert';

const TEST_FILE = `${__dirname}/04-custom-resolver.ts`;

describe('urbanjs-config - custom resolver', () => {
  beforeEach(() => {
    delete require.cache[TEST_FILE];
  });

  it('resolves references', () => {
    expect.deepEqual(require(TEST_FILE).config, {
      port: 3000,
      serverOrigin: 'http://localhost:3000'
    });
  });
});
