const assert = require('assert');
const app = require('../../src/app');

describe('\'item\' service', () => {
  it('registered the service', () => {
    const service = app.service('item');

    assert.ok(service, 'Registered the service (item)');
  });
});
