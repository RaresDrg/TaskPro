import * as Yup from "yup";

const VALIDATIONS_MAP = {
  name: Yup.string()
    .trim()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .required("Required *"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format")
    .required("Required *"),
  password: Yup.string()
    .min(8, "Password is too short")
    .max(50, "Password is too long")
    .matches(/[A-Z]/, "Missing uppercase letter")
    .matches(/[a-z]/, "Missing lowercase letter")
    .matches(/\d/, "Missing digit")
    .required("Required *"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Password doesn't match")
    .required("Required *"),
  loginPassword: Yup.string().required("Required *"),
  comment: Yup.string()
    .trim()
    .min(10, "Comment is too short")
    .max(400, "Comment is too long")
    .required("Required *"),
  title: Yup.string()
    .trim()
    .min(3, "Title is too short")
    .max(50, "Title is too long")
    .required("Required *"),
  description: Yup.string()
    .trim()
    .min(5, "Description is too short")
    .max(400, "Description is too long")
    .required("Required *"),
};
type ValidationKey = keyof typeof VALIDATIONS_MAP;

export function getValidationSchema(fields: ValidationKey[]) {
  return Yup.object(
    Object.fromEntries(fields.map((field) => [field, VALIDATIONS_MAP[field]])),
  );
}
