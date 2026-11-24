import { store } from "../redux/store";
import { setActiveLoader } from "../redux/general/actions";
import type { LoadingType, ErrorResponse } from "../types";

type RequestFlowOptions<T> = {
  request: () => Promise<T>;
  delay?: number;
  loadingType?: LoadingType;
  onSuccess?: (res: T) => void;
  onError?: (error: ErrorResponse) => void;
  onFinally?: () => void;
};

export async function handleRequestFlow<T>(options: RequestFlowOptions<T>) {
  const { request, delay, loadingType, onSuccess, onError, onFinally } =
    options;

  if (loadingType) store.dispatch(setActiveLoader(loadingType));

  try {
    const [requestResult] = await Promise.allSettled([
      request(),
      new Promise((resolve) => setTimeout(resolve, delay ?? 0)),
    ]);

    if (requestResult.status === "fulfilled") onSuccess?.(requestResult.value);
    else onError?.(requestResult.reason as ErrorResponse);
  } finally {
    if (loadingType) store.dispatch(setActiveLoader(null));
    onFinally?.();
  }
}
