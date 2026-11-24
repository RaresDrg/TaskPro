import Joi from "joi";
import { Types } from "mongoose";
import type { AtLeastOne } from "../types/index.js";
import {
  THEMES,
  BOARD_ICONS,
  BOARD_BACKGROUNDS,
  CARD_PRIORITIES,
} from "../constants/index.js";

const VALIDATIONS_MAP = {
  name: Joi.string().trim().min(3).max(50).required().label("Name").messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} must not be empty",
    "string.min": "{#label} must be at least {#limit} characters long",
    "string.max": "{#label} must be at most {#limit} characters long",
    "any.required": "{#label} is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    .required()
    .label("Email")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "string.email": "{#label} has an invalid format",
      "string.pattern.base": "{#label} has an invalid format",
      "any.required": "{#label} is required",
    }),
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .label("Password")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "string.min": "{#label} must be at least {#limit} characters long",
      "string.max": "{#label} must be at most {#limit} characters long",
      "string.pattern.base": `{#label} must include an uppercase, a lowercase and a digit`,
      "any.required": "{#label} is required",
    }),
  loginPassword: Joi.string().required().label("Password").messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} must not be empty",
    "any.required": "{#label} is required",
  }),
  comment: Joi.string()
    .trim()
    .min(10)
    .max(400)
    .required()
    .label("Comment")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "string.min": "{#label} must be at least {#limit} characters long",
      "string.max": "{#label} must be at most {#limit} characters long",
      "any.required": "{#label} is required",
    }),
  theme: Joi.string()
    .valid(...THEMES)
    .required()
    .label("Theme")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "any.only": `{#label} must be one of: ${THEMES.join(", ")}`,
      "any.required": "{#label} is required",
    }),
  title: Joi.string().trim().min(3).max(50).required().label("Title").messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} must not be empty",
    "string.min": "{#label} must be at least {#limit} characters long",
    "string.max": "{#label} must be at most {#limit} characters long",
    "any.required": "{#label} is required",
  }),
  icon: Joi.string()
    .valid(...BOARD_ICONS)
    .required()
    .label("Icon")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "any.only": `{#label} must be one of: ${BOARD_ICONS.join(", ")}`,
      "any.required": "{#label} is required",
    }),
  background: Joi.string()
    .valid(...BOARD_BACKGROUNDS)
    .required()
    .label("Background")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "any.only": `{#label} must be one of: ${BOARD_BACKGROUNDS.join(", ")}`,
      "any.required": "{#label} is required",
    }),
  description: Joi.string()
    .trim()
    .min(5)
    .max(400)
    .required()
    .label("Description")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "string.min": "{#label} must be at least {#limit} characters long",
      "string.max": "{#label} must be at most {#limit} characters long",
      "any.required": "{#label} is required",
    }),
  priority: Joi.string()
    .valid(...CARD_PRIORITIES)
    .required()
    .label("Priority")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "any.only": `{#label} must be one of: ${CARD_PRIORITIES.join(", ")}`,
      "any.required": "{#label} is required",
    }),
  deadline: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
      const deadline = new Date(value);
      deadline.setUTCHours(0, 0, 0, 0);
      if (
        Number.isNaN(deadline.getTime()) ||
        deadline.toISOString().slice(0, 10) !== value
      ) {
        return helpers.error("deadline.format");
      }
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      if (deadline.getTime() < today.getTime()) {
        return helpers.error("deadline.min");
      }
      return value;
    })
    .required()
    .label("Deadline")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "string.pattern.base": "{#label} must be in YYYY-MM-DD format",
      "deadline.format": "{#label} must be an existing calendar date",
      "deadline.min": "{#label} must not be in the past",
      "any.required": "{#label} is required",
    }),
  validationToken: Joi.string()
    .trim()
    .required()
    .label("Validation Token")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "any.required": "{#label} is required",
    }),
  boardId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) return helpers.error("id.format");
      return value;
    })
    .required()
    .label("Board Id")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "id.format": `{#label} has an invalid format — it must be a 24-character hexadecimal string`,
      "any.required": "{#label} is required",
    }),
  columnId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) return helpers.error("id.format");
      return value;
    })
    .required()
    .label("Column Id")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "id.format": `{#label} has an invalid format — it must be a 24-character hexadecimal string`,
      "any.required": "{#label} is required",
    }),
  cardId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) return helpers.error("id.format");
      return value;
    })
    .required()
    .label("Card Id")
    .messages({
      "string.base": "{#label} must be a string",
      "string.empty": "{#label} must not be empty",
      "id.format": `{#label} has an invalid format — it must be a 24-character hexadecimal string`,
      "any.required": "{#label} is required",
    }),
};
type ValidationKey = keyof typeof VALIDATIONS_MAP;

function validateData(data: AtLeastOne<Record<ValidationKey, unknown>>) {
  const schema = Joi.object(
    Object.fromEntries(
      Object.keys(data)
        .filter((key) => key in VALIDATIONS_MAP)
        .map((key) => [key, VALIDATIONS_MAP[key as ValidationKey]]),
    ),
  ).options({ errors: { wrap: { label: false } } });

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) throw error;
}

export default validateData;
