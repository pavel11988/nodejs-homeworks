const Joi = require("joi");

const emailPattern = /[a-z0-9]+@[a-z]{2,3}/;

const signupSchema = Joi.object().keys({
  password: Joi.string().min(5).required(),
  email: Joi.string().pattern(emailPattern).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().pattern(emailPattern).required(),
  password: Joi.string().min(5).required(),
});

const patchSchema = Joi.object().keys({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .error(
      new Error(
        `The subscription can only take values "starter", "pro" and "business"`
      )
    ),
});

const emailSchema =  Joi.object().keys({
  email: Joi.string().pattern(emailPattern).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  patchSchema,
  emailSchema,
};
