const { Item } = require('./item.class');
const createModel = require('../../models/item.model');
const hooks = require('./item.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/item', new Item(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('item');

  service.hooks(hooks);
};