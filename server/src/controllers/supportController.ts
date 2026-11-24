import type { RequestHandler } from "express";
import { validateData, sendEmail } from "../config/index.js";
import { sendSuccessResponse } from "../utils/index.js";

export const reachSupport: RequestHandler = async (req, res, next) => {
  try {
    const { comment } = req.body;
    validateData({ comment });

    await sendEmail({
      user: { name: req.user!.name, email: req.user!.email },
      type: "reach-support",
      comment: comment.trim(),
    });

    sendSuccessResponse(res, 200, {
      message: `Support request received — check your email (including spam folder) for details`,
    });
  } catch (error) {
    next(error);
  }
};
