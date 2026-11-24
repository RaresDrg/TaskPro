import { toast, type ToastOptions } from "react-toastify";
import type { ErrorResponse } from "../types";

export const notify = {
  success(message: string, options?: ToastOptions) {
    toast.success(message, options);
  },
  info(message: string, options?: ToastOptions) {
    toast.info(message, options);
  },
  warning(message: string, options?: ToastOptions) {
    toast.warning(message, options);
  },
  error(message: string, options?: ToastOptions) {
    toast.error(message, options);
  },
  errorResponse(error: ErrorResponse, options?: ToastOptions) {
    if (error.status !== 401) {
      const message = error.response?.data?.message ?? "Internal server error";
      toast.error(message, options);
    }
  },
};
