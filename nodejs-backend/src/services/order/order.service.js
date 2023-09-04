const { Order } = require('./order.class');
const createModel = require('../../models/order.model');
const hooks = require('./order.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/order', new Order(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('order');

  service.hooks(hooks);
};