import "dotenv/config";

export const IN_DEVELOPMENT = process.env.NODE_ENV === "development";
export const PORT = process.env.PORT ?? 3000;
export const DB_URI = process.env.DB_URI!;

export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS!);
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const RANDOM_BYTES_LENGTH = Number(process.env.RANDOM_BYTES_LENGTH!);
export const COOKIE_PARSER_SECRET = process.env.COOKIE_PARSER_SECRET!;

export const CLOUD_NAME = process.env.CLOUD_NAME!;
export const API_KEY = process.env.API_KEY!;
export const API_SECRET = process.env.API_SECRET!;

export const EMAIL = process.env.EMAIL!;
export const PASSWORD = process.env.PASSWORD!;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
