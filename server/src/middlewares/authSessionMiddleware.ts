import type { RequestHandler } from "express";
import { Types } from "mongoose";
import { sessionService } from "../services/index.js";
import { handleAuthSession, createError } from "../utils/index.js";

const authSessionMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.signedCookies ?? {};
    const [scheme, sessionId] = req.headers.authorization?.split(" ") ?? [];

    if (scheme === "Bearer" && Types.ObjectId.isValid(sessionId)) {
      const _id = new Types.ObjectId(sessionId);

      if (accessToken) {
        const session = await sessionService.findSession({ _id, accessToken });
        if (session?.owner) {
          req.user = session.owner;
          next();
          return;
        }
      }

      if (refreshToken) {
        const session = await sessionService.findSession({ _id, refreshToken });
        if (session?.owner) {
          if (req.path !== "/logout") {
            await handleAuthSession(session.owner._id, "renew", res);
          }
          req.user = session.owner;
          next();
          return;
        }
      }
    }

    throw new Error();
  } catch {
    next(
      createError(
        "UnauthorizedError",
        "Access denied: invalid or expired session",
      ),
    );
  }
};

export default authSessionMiddleware;
