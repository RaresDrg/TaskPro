import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { findUser, addGoogleUserToDB } from "../servicies/userService.js";
import { handleRedirect } from "../utils/utils.js";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  IN_DEVELOPMENT,
} from "../config/config-env.js";

const opts = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: IN_DEVELOPMENT
    ? "http://localhost:3000/api/users/google-auth/callback"
    : "https://taskpro-server-delta.vercel.app/api/users/google-auth/callback",
};

passport.use(
  new Strategy(opts, async (_, __, profile, done) => {
    try {
      let user = await findUser({
        email: profile.emails?.[0].value,
      });

      if (!user) {
        const newUser = {
          isGoogleUser: true,
          name: profile.displayName,
          email: profile.emails![0].value,
          profilePhotoUrl: profile?.photos?.[0]?.value ?? null,
        };

        user = await addGoogleUserToDB(newUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const googleAuthMiddleware = {
  redirect: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {
      session: false,
      prompt: "select_account",
      scope: ["profile", "email"],
    })(req, res, next);
  },
  handleCallback: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { session: false }, (err, user) => {
      if (err || !user) {
        handleRedirect(res, "failed");
        return;
      }

      req.user = user;
      next();
    })(req, res, next);
  },
};

export default googleAuthMiddleware;
