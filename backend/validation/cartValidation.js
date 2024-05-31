const Joi = require("joi");

// Define a schema
const add = Joi.object({
  userId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
  qty: Joi.number().integer().optional(),
});

const checkout = Joi.object({
  productIds: Joi.array().items(Joi.number()).min(1).required(),
  shippingAddressId: Joi.number().required(),
  BillingAddressId: Joi.number().required(),
  card: Joi.object().optional(),
  userId: Joi.number().required(),
});

const list = Joi.object({
  userId: Joi.number().required(),
});

module.exports = {
  add,
  checkout,
  list,
};
