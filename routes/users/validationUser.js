const Joi = require('joi');

// Validation when signup or login a user
const schemaUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const validate = async (schema, obj) => {
  const result = await schema.validateAsync(obj);
  return result;
};

module.exports = {
  validationUser: async (req, res, next) => {
    return await validate(schemaUser, req.body);
  },
};
