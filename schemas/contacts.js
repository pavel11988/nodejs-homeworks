const Joi = require("joi");

const addSchema = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(5).required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(5).required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean(),
});

const patchSchema = Joi.object().keys({
  favorite: Joi.boolean().required().error(new Error("Missing field favorite")),
});

module.exports = {
  addSchema,
  updateSchema,
  patchSchema,
};
