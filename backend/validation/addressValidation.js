const Joi = require("joi");

// Define a schema
const add = Joi.object({
  addressName: Joi.string().required(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().allow("").optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  phone: Joi.string().optional(),
  pinCode: Joi.number().required(),
  userId: Joi.number().required(),
});

const update = Joi.object({
  id: Joi.number().integer().required(),
  addressName: Joi.string().optional(),
  addressLine1: Joi.string().optional(),
  addressLine2: Joi.string().allow("").optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  phone: Joi.string().optional(),
  pinCode: Joi.number().optional(),
  userId: Joi.number().optional(),
});

const details = Joi.object({
  id: Joi.number().integer().required(),
});

const addressDelete = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  add,
  update,
  details,
  addressDelete,
};
