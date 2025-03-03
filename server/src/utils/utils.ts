import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserType, BackgroundValue } from "../app.types.js";
import {
  SALT_ROUNDS,
  RANDOM_BYTES_LENGTH,
  ACCESS_TOKEN_SECRET,
} from "../config/config-env.js";

export function sendSuccessResponse(
  res: Response,
  statusCode: 200 | 201,
  responseBody: object
) {
  res.status(statusCode).json({ status: "success", ...responseBody });
}

export function sendFailureResponse(
  res: Response,
  statusCode: 400 | 401 | 403 | 404 | 409 | 500,
  message: string
) {
  res.status(statusCode).json({ status: "failed", message });
}

export function hash(text: string) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hashedText = bcrypt.hashSync(text, salt);

  return hashedText;
}

export function compareHashedData(plainText: string, hashedText: string) {
  return bcrypt.compareSync(plainText, hashedText);
}

export function generateRandomBytes() {
  const token = crypto.randomBytes(RANDOM_BYTES_LENGTH).toString("hex");

  return token;
}

export function generateValidationToken() {
  const validationToken = {
    value: generateRandomBytes(),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  };

  return validationToken;
}

export function generateAuthTokens(user: UserType) {
  const accessToken = jwt.sign(
    { email: user.email, id: user._id },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
  const refreshToken = generateRandomBytes();

  const tokens = { accessToken, refreshToken };
  return tokens;
}

export function sendTokensAsCookies(
  res: Response,
  tokens: ReturnType<typeof generateAuthTokens>
) {
  const { accessToken, refreshToken } = tokens;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "none",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
}

export function selectUserProperties(user: UserType) {
  return {
    email: user.email,
    name: user.name,
    theme: user.theme,
    profilePhotoUrl: user.profilePhotoUrl,
    isGoogleUser: user.isGoogleUser,
  };
}

export function getBoardOptions() {
  const iconsOptions = [
    "icon-project",
    "icon-star",
    "icon-loading",
    "icon-puzzlePiece",
    "icon-container",
    "icon-lightning",
    "icon-colors",
    "icon-hexagon",
  ];

  const bgOptions = [
    "bg-default",
    "bg-1",
    "bg-2",
    "bg-3",
    "bg-4",
    "bg-5",
    "bg-6",
    "bg-7",
    "bg-8",
    "bg-9",
    "bg-10",
    "bg-11",
    "bg-12",
    "bg-13",
    "bg-14",
    "bg-15",
  ];

  const priorityOptions = ["low", "medium", "high", "without"];

  return { iconsOptions, bgOptions, priorityOptions };
}

export function getBg(bg: BackgroundValue) {
  if (bg === "bg-default") {
    return {
      value: bg,
      sources: null,
    };
  } else {
    const baseURL =
      "https://res.cloudinary.com/db73szjbz/image/upload/TaskPro/assets/backgrounds/";

    return {
      value: bg,
      sources: {
        mobile: `${baseURL}/mobile/${bg}`,
        tablet: `${baseURL}/tablet/${bg}`,
        desktop: `${baseURL}/desktop/${bg}`,
        mobile_2x: `${baseURL}/mobile/${bg}-2x`,
        tablet_2x: `${baseURL}/tablet/${bg}-2x`,
        desktop_2x: `${baseURL}/desktop/${bg}-2x`,
      },
    };
  }
}
