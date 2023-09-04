const assert = require('assert');
const app = require('../../src/app');

describe('\'order\' service', () => {
  it('registered the service', () => {
    const service = app.service('order');

    assert.ok(service, 'Registered the service (order)');
  });
});
