import type { FormikErrors, FormikTouched } from "formik";

export function hasTouchedErrors<Values>(
  errors: FormikErrors<Values>,
  touched: FormikTouched<Values>,
) {
  return Object.keys(errors).some((key) => touched[key as keyof Values]);
}
