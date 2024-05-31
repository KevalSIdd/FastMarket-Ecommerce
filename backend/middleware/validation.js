const Joi = require("joi");

var options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
  });

  return schema.validate(data, options);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
  });

  return schema.validate(data, options);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().strict(),
    email: Joi.string().email().required().strict(),
    password: Joi.string().min(6).required().strict(),
    fullName: Joi.string().required().strict(),
  });

  return schema.validate(data, options);
};

// add review validation
const addReviewValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required().strict(),
    rating: Joi.number().required().strict(),
    productId: Joi.number().required().strict(),
    description: Joi.string().required().strict(),
  });
  return schema.validate(data, options);
};
module.exports = {
  registerValidation,
  loginValidation,
  updateUserValidation,
  addReviewValidation,
};
