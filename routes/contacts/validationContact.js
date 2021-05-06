const Joi = require('joi');

// Validation when creating a contact
const schemaCreateContact = Joi.object({
  favorite: Joi.boolean().optional(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      'string.pattern.base': `Phone number must have 10 digits (example: 0981112233).`,
    })
    .required(),
});

// Validation when query contact
const schemaQueryContact = Joi.object({
  // filter: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(20).optional(),
  page: Joi.number().integer().min(0).optional(),
  favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc');

// Validation when updating a contact
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
    .optional(),
}).min(1);

// Validation when updating status of contact
const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, obj) => {
  const result = await schema.validateAsync(obj);
  return result;
};

module.exports = {
  validationQueryContact: async (req, res, next) => {
    return await validate(schemaQueryContact, req.query, next);
  },
  validationCreateContact: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next);
  },
  validationUpdateStatusContact: async (req, res, next) => {
    return await validate(schemaUpdateStatusContact, req.body, next);
  },
};
