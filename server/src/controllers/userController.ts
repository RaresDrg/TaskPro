import { Request, Response, NextFunction } from "express";
import * as userService from "../servicies/userService.js";
import * as utils from "../utils/utils.js";
import uploadOnCloud from "../config/config-cloudinary.js";
import sendEmail from "../config/config-nodemailer.js";
import validateData from "../config/config-validation.js";
import { UserType } from "../app.types.js";

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    validateData({ name, email, password });

    const newUser = await userService.addUsertoDB({ name, email, password });
    const tokens = utils.generateAuthTokens(newUser);
    await userService.updateUser(newUser._id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 201, {
      message: "User created successfully",
      data: { user: utils.selectUserProperties(newUser) },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, loginPassword } = req.body;
    validateData({ email, loginPassword });

    const user = await userService.findUser({ email });
    if (!user) {
      const message = "There is no account associated with this email address";
      utils.sendFailureResponse(res, 404, message);
      return;
    }

    if (user.isGoogleUser) {
      const message =
        "The account associated with this email is linked with Google, so please use Google in order to authenticate";
      utils.sendFailureResponse(res, 403, message);
      return;
    }

    const passwordMatch = utils.compareHashedData(loginPassword, user.password);
    if (!passwordMatch) {
      utils.sendFailureResponse(res, 400, "Password is wrong");
      return;
    }

    const tokens = utils.generateAuthTokens(user);
    await userService.updateUser(user._id, { token: tokens.refreshToken });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      message: "Logged in successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as UserType;
    await userService.updateUser(user._id, { token: null });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    utils.sendSuccessResponse(res, 200, {
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    validateData({ email });

    const user = await userService.findUser({ email });
    if (!user) {
      const message = "There is no account associated with this email address";
      utils.sendFailureResponse(res, 404, message);
      return;
    }

    if (user.isGoogleUser) {
      const message =
        "Password change not supported. The account associated with this email is linked with Google, so please use Google in order to authenticate.";
      utils.sendFailureResponse(res, 403, message);
      return;
    }

    const validationToken = utils.generateValidationToken();
    await userService.updateUser(user.id, { validationToken });

    await sendEmail("passwordRecovery", user, validationToken.value);

    const message =
      "Password change request received. Please check your email (including spam folder) for a confirmation message.";
    utils.sendSuccessResponse(res, 200, { message });
  } catch (error) {
    next(error);
  }
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body;
    validateData({ password });

    const user = req.user as UserType;
    const tokens = utils.generateAuthTokens(user);

    await userService.updateUser(user._id, {
      password: utils.hash(password),
      token: tokens.refreshToken,
      validationToken: null,
    });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      message: "Password changed successfully",
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

async function reachSupport(req: Request, res: Response, next: NextFunction) {
  try {
    const { comment } = req.body;
    validateData({ comment });

    const user = req.user as UserType;
    await sendEmail("customerSupport", user, comment);

    const message =
      "We have successfully received your comment. A confirmation email has been sent to you. Please, check your inbox or spam folder !";
    utils.sendSuccessResponse(res, 200, { message });
  } catch (error) {
    next(error);
  }
}

async function updateTheme(req: Request, res: Response, next: NextFunction) {
  try {
    const { theme } = req.body;
    validateData({ theme });

    const user = req.user as UserType;
    const updatedUser = await userService.updateUser(user._id, { theme });

    utils.sendSuccessResponse(res, 200, {
      message: "Your profile's theme has been successfully updated",
      data: { user: utils.selectUserProperties(updatedUser!) },
    });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email } = req.body;
    validateData({ name, email });

    const user = req.user as UserType;
    let updatedUser = await userService.updateUser(user._id, { name, email });

    if (req.file) {
      const profilePhotoUrl = await uploadOnCloud(req.file, user._id, name);
      updatedUser = await userService.updateUser(user._id, { profilePhotoUrl });
    }

    utils.sendSuccessResponse(res, 200, {
      message: "Your profile has been successfully updated",
      data: { user: utils.selectUserProperties(updatedUser!) },
    });
  } catch (error) {
    next(error);
  }
}

async function getUserData(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as UserType;
    const tokens = utils.generateAuthTokens(user);

    await userService.updateUser(user._id, {
      validationToken: null,
      token: tokens.refreshToken,
    });

    utils.sendTokensAsCookies(res, tokens);
    utils.sendSuccessResponse(res, 200, {
      data: { user: utils.selectUserProperties(user) },
    });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  updatePassword,
  reachSupport,
  updateTheme,
  updateProfile,
  getUserData,
};
