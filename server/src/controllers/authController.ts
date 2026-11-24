import type { RequestHandler } from "express";
import { userService, sessionService } from "../services/index.js";
import { validateData, sendEmail } from "../config/index.js";
import * as utils from "../utils/index.js";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    validateData({ name, email, password });

    const newUser = await userService.addUser({
      authMethod: "local",
      name: name.trim(),
      email,
      password: await utils.hash(password),
    });

    await utils.handleAuthSession(newUser._id, "init", res);

    utils.sendSuccessResponse(res, 201, {
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    validateData({ email, loginPassword: password });

    const user = await userService.findUser({ email });
    if (!user) {
      throw utils.createError(
        "NotFoundError",
        "There is no account associated with this email address",
      );
    }

    if (user.authMethod === "google") {
      throw utils.createError(
        "ForbiddenError",
        "The account associated with this email address is managed through Google, so please authenticate using Google sign-in",
      );
    }

    const isMatch = await utils.compareHashedData(password, user.password);
    if (!isMatch) {
      throw utils.createError("ValidationError", "Password is wrong");
    }

    await utils.handleAuthSession(user._id, "init", res);

    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    await sessionService.deleteSession({ owner: req.user!._id, type: "auth" });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    utils.sendSuccessResponse(res, 200, { message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    validateData({ email });

    const user = await userService.findUser({ email });
    if (!user) {
      throw utils.createError(
        "NotFoundError",
        "There is no account associated with this email address",
      );
    }

    if (user.authMethod === "google") {
      throw utils.createError(
        "ForbiddenError",
        "Password reset is not supported. The account associated with this email address is managed through Google sign-in",
      );
    }

    const validationToken = await utils.handleValidationSession(user._id);
    await sendEmail({
      user: { name: user.name, email: user.email },
      type: "reset-password",
      validationToken,
    });

    utils.sendSuccessResponse(res, 200, {
      message: `Request received — check your email (including spam folder) for further instructions`,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user!;

    if (user.authMethod === "google") {
      throw utils.createError(
        "ForbiddenError",
        "Password reset is not supported. The account associated with this email address is managed through Google sign-in",
      );
    }

    const { password } = req.body;
    validateData({ password });

    const updatedUser = await userService.updateUser(
      { _id: user._id },
      { password: await utils.hash(password) },
    );

    await utils.handleAuthSession(user._id, "init", res);

    utils.sendSuccessResponse(res, 200, {
      message: "Password changed successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const finalizeGoogleAuth: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user!;
    await utils.handleAuthSession(user._id, "init", res);
    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
