export type AtLeastOne<T, K extends keyof T = keyof T> = {
  [P in K]: Pick<T, P> & Partial<Record<Exclude<K, P>, T[Exclude<K, P>]>>;
}[K];

export type ResponseError =
  | { name: "ValidationError"; statusCode: 400 }
  | { name: "MulterError"; statusCode: 400 }
  | { name: "CastError"; statusCode: 400 }
  | { name: "SyntaxError"; statusCode: 400 }
  | { name: "UnauthorizedError"; statusCode: 401 }
  | { name: "ForbiddenError"; statusCode: 403 }
  | { name: "NotFoundError"; statusCode: 404 }
  | { name: "ConflictError"; statusCode: 409 }
  | { name: "PayloadTooLargeError"; statusCode: 413 }
  | { name: "UnsupportedMediaTypeError"; statusCode: 415 }
  | { name: "RateLimitError"; statusCode: 429 }
  | { name: "InternalServerError"; statusCode: 500 }
  | { name: "BadGatewayError"; statusCode: 502 };
