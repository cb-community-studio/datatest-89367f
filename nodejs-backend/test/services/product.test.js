const assert = require('assert');
const app = require('../../src/app');

describe('\'product\' service', () => {
  it('registered the service', () => {
    const service = app.service('product');

    assert.ok(service, 'Registered the service (product)');
  });
});
