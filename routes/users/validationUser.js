const Joi = require('joi');

// Validation when signup or login a user
const schemaAuthUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const schemaUpdateUser = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const validate = async (schema, obj) => {
  const result = await schema.validateAsync(obj);
  return result;
};

module.exports = {
  validationUser: async (req, res, next) => {
    return await validate(schemaAuthUser, req.body);
  },
  validationUpdateUser: async (req, res, next) => {
    return await validate(schemaUpdateUser, req.body);
  },
};
