import Joi from "joi";
import { STATUS } from "../interfaces/status.interface";

export const getTaskQuerySchema = Joi.object({
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

export const taskIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "Id is required",
    "number.base": "id must be a number",
  }),
}).options({
  stripUnknown: true,
});

export const createTaskBodySchema = Joi.object({
    id: Joi.number().required().messages({
        "any.required": "Id is required",
    }),
    name: Joi.string().required().messages({
      "any.required": "name is required",
    }),
    status: Joi.string()
      .required()
      .messages({
        "any.only": `Status must be one of ${Object.values(STATUS).join(
          ", "
        )}`,
      })
      .custom((value, helpers) => {
        if (!Object.values(STATUS).includes(value)) {
          return helpers.error("any.only");
        }
        return value;
      }),
  }).options({ stripUnknown: true });

export const updateTaskBodySchema = Joi.object({
    id: Joi.number().required().messages({
        "any.required": "Id is required",
    }),
    name: Joi.string().optional(),
    status: Joi.string()
        .optional()
        .messages({
        "any.only": `Status must be one of ${Object.values(STATUS).join(
            ", "
        )}`,
        })
        .custom((value, helpers) => {
        if (!Object.values(STATUS).includes(value)) {
            return helpers.error("any.only");
        }
        return value;
        }),
}).options({ stripUnknown: true });
