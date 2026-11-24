import type { RequestHandler } from "express";
import { sessionService } from "../services/index.js";
import { validateData } from "../config/index.js";
import { createError } from "../utils/index.js";

const validationSessionMiddleware: RequestHandler = async (req, _res, next) => {
  try {
    const { validationToken } = req.body;
    validateData({ validationToken });

    const session = await sessionService.findSessionAndDelete({
      validationToken,
    });
    if (!session?.owner) {
      throw createError(
        "NotFoundError",
        "The provided validation token is invalid or has expired",
      );
    }

    req.user = session.owner;
    next();
  } catch (error) {
    next(error);
  }
};

export default validationSessionMiddleware;
