import Joi from "joi";

export const getUserQuerySchema = Joi.object({
  q: Joi.string().optional(),
  page: Joi.number()
    .min(1)
    .optional()
    .messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be at least 1",
    })
    .default(1),
  size: Joi.number()
    .min(1)
    .max(10)
    .optional()
    .messages({
      "number.base": "Size must be a number",
      "number.min": "Size must be at least 1",
      "number.max": "Size must be at most 10",
    })
    .default(10),
}).options({ stripUnknown: true });

export const createUserBodySchema = Joi.object({
  id: Joi.string().required().messages({
    "any.requied": "Id is required",
  }),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid format",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Pass is required",
      "string.min": "Password must be 8 characters minimum",
      "password.uppercase": "Password must have 1 Uppercase Charcter",
      "password.lowercase": "Password must have 1 lowercase Charcter",
      "password.special": "Password must have 1 Special",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$%^&*.,/]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
  permissions: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Permissions are required",
    "array.base": "Permissions must be an array",
    "array.includes": "Each permission must be a string",
  }),
}).options({
  stripUnknown: true,
});

export const userIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "Id is required",
    "number.base": "id must be a number",
  }),
}).options({
  stripUnknown: true,
});

export const updateUserBodySchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Id is required",
  }),
  name: Joi.string().optional().messages({
    "any.required": "Name must be a string",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      "any.required": "Password required",
      "string.min": "Password must be at least 8 characters",
      "password.uppercase":
        "Password must contain at least one uppercase letter",
      "password.lowercase":
        "Password must contain at least one lowercase letter",
      "password.special":
        "Password must contain at least one special character",
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("password.uppercase");
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error("password.lowercase");
      }
      if (!/[!@#$]/.test(value)) {
        return helpers.error("password.special");
      }
      return value;
    }),
  permissions: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Permissions are required",
    "array.base": "Permissions must be an array",
    "array.includes": "Each permission must be a string",
  }),
}).options({ stripUnknown: true });
