const { Product } = require('./product.class');
const createModel = require('../../models/product.model');
const hooks = require('./product.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/product', new Product(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product');

  service.hooks(hooks);
};