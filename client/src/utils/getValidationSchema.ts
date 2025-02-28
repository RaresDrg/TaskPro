import * as Yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/constants";

const VALIDATIONS_MAP = {
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Required *"),
  email: Yup.string()
    .trim()
    .matches(EMAIL_REGEX, { message: "Invalid email address" })
    .required("Required *"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(PASSWORD_REGEX, {
      message: "Must include an uppercase, a lowercase, a digit",
    })
    .required("Required *"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password doesn't match")
    .required("Required *"),
  loginPassword: Yup.string().required("Required *"),
  comment: Yup.string()
    .trim()
    .min(10, "It must be at least 10 characters long")
    .max(400, "It must be less than 400 characters long")
    .required("Required *"),
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be less than 50 characters long")
    .required("Required *"),
  description: Yup.string()
    .trim()
    .min(5, "It must be at least 5 characters long")
    .max(400, "It must be less than 400 characters long")
    .required("Required *"),
};
type ValidationKey = keyof typeof VALIDATIONS_MAP;

export function getValidationSchema(data: ValidationKey[]) {
  const schema = Yup.object(
    Object.fromEntries(
      data
        .filter((key) => key in VALIDATIONS_MAP)
        .map((key) => [key, VALIDATIONS_MAP[key]])
    )
  );

  return schema;
}
