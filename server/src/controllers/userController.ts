import type { RequestHandler } from "express";
import { userService } from "../services/index.js";
import { validateData } from "../config/index.js";
import * as utils from "../utils/index.js";

export const updateTheme: RequestHandler = async (req, res, next) => {
  try {
    const { theme } = req.body;
    validateData({ theme });

    const updatedUser = await userService.updateUser(
      { _id: req.user!._id },
      { theme },
    );

    utils.sendSuccessResponse(res, 200, {
      message: "Theme changed successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = req.user!;

    const isGoogleUser = user.authMethod === "google";

    if (isGoogleUser && email) {
      throw utils.createError(
        "ForbiddenError",
        "Email cannot be changed. The account is managed through Google sign-in",
      );
    }

    validateData({ name, ...(!isGoogleUser ? { email } : {}) });

    const profilePhotoID = req.file
      ? await utils.uploadProfilePhoto({
          source: { file: req.file },
          user: { _id: user._id, name: name.trim() },
        })
      : null;

    const updatedUser = await userService.updateUser(
      { _id: user._id },
      {
        name: name.trim(),
        ...(!isGoogleUser ? { email } : {}),
        ...(profilePhotoID ? { profilePhotoID } : {}),
      },
    );

    utils.sendSuccessResponse(res, 200, {
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
