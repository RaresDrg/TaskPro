import Joi from "joi";
import { getBoardOptions } from "../utils/utils.js";

const { iconsOptions, bgOptions, priorityOptions } = getBoardOptions();

const VALIDATIONS_MAP = {
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be between 3 and 50 characters long",
    "string.max": "Name must be between 3 and 50 characters long",
    "any.required": "Name field is required",
  }),
  email: Joi.string()
    .trim()
    .pattern(new RegExp(/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/))
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.pattern.base": "Invalid email address",
      "any.required": "Email field is required",
    }),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/))
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be at least 8 characters long and must include an uppercase, a lowercase and a digit",
      "any.required": "Password field is required",
    }),
  loginPassword: Joi.string().required().messages({
    "string.base": "LoginPassword must be a string",
    "string.empty": "LoginPassword is required",
    "any.required": "LoginPassword field is required",
  }),
  comment: Joi.string().trim().min(10).max(400).required().messages({
    "string.base": "Comment must be a string",
    "string.empty": "Comment is required",
    "string.min": "Comment must be between 10 and 400 characters long",
    "string.max": "Comment must be between 10 and 400 characters long",
    "any.required": "Comment field is required",
  }),
  theme: Joi.string().valid("light", "dark", "violet").required().messages({
    "any.only": "Theme is either: light, dark or violet",
    "any.required": "Theme field is required",
  }),
  title: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be between 3 and 50 characters long",
    "string.max": "Title must be between 3 and 50 characters long",
    "any.required": "Title field is required",
  }),
  icon: Joi.string()
    .valid(...iconsOptions)
    .required()
    .messages({
      "any.only": `Icon should be one of these: ${iconsOptions.join(", ")}`,
      "any.required": "Icon field is required",
    }),
  background: Joi.string()
    .valid(...bgOptions)
    .required()
    .messages({
      "any.only": `Background should be one of these: ${bgOptions.join(", ")}`,
      "any.required": "Background field is required",
    }),
  description: Joi.string().trim().min(5).max(400).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be between 5 and 400 characters long",
    "string.max": "Description must be between 5 and 400 characters long",
    "any.required": "Description field is required",
  }),
  priority: Joi.string()
    .valid(...priorityOptions)
    .required()
    .messages({
      "any.only": `Priority should be one of: ${priorityOptions.join(", ")}`,
      "any.required": "Priority field is required",
    }),
  deadline: Joi.date()
    .min(new Date().setHours(0, 0, 0, 0))
    .required()
    .messages({
      "date.base": "Deadline must be a Date",
      "date.min": "Deadline should be today's date or a future date",
      "any.required": "Deadline field is required",
    }),
  updatedDeadline: Joi.date().required().messages({
    "date.base": "Deadline must be a Date",
    "any.required": "Deadline field is required",
  }),
  columns: Joi.array().required().messages({
    "array.base": "Columns must be an array of obejcts",
    "any.required": "Columns field is required",
  }),
};
type ValidationKey = keyof typeof VALIDATIONS_MAP;

export function validateData(data: Partial<Record<ValidationKey, string>>) {
  const schema = Joi.object(
    Object.fromEntries(
      Object.keys(data)
        .filter((key) => key in VALIDATIONS_MAP)
        .map((key) => [key, VALIDATIONS_MAP[key as ValidationKey]])
    )
  );

  const { error } = schema.validate(data, { abortEarly: false });
  if (error) throw error;
}

export default validateData;
