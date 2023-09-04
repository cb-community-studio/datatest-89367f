const users = require("./users/users.service.js");
const order = require("./order/order.service.js");
const item = require("./item/item.service.js");
const product = require("./product/product.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(order);
  app.configure(item);
  app.configure(product);
  // ~cb-add-configure-service-name~
};
