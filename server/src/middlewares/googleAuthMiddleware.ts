import type { RequestHandler } from "express";
import { Types } from "mongoose";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { userService } from "../services/index.js";
import { handleValidationSession, uploadProfilePhoto } from "../utils/index.js";
import { envVariables } from "../config/index.js";

passport.use(
  new Strategy(
    {
      clientID: envVariables.GOOGLE_CLIENT_ID,
      clientSecret: envVariables.GOOGLE_CLIENT_SECRET,
      callbackURL: `${envVariables.SERVER_URL}/api/auth/google/callback`,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) throw new Error("Google profile has no email associated");

        const existingUser = await userService.findUser({ email });
        if (existingUser) return done(null, existingUser);

        const googleProfilePhotoUrl = profile.photos?.[0].value;
        if (!googleProfilePhotoUrl) {
          const newUser = await userService.addUser({
            authMethod: "google",
            name: profile.displayName,
            email,
          });
          return done(null, newUser);
        }

        const _id = new Types.ObjectId();
        const profilePhotoID = await uploadProfilePhoto({
          source: { url: googleProfilePhotoUrl },
          user: { _id, name: profile.displayName },
        });
        const newUser = await userService.addUser({
          authMethod: "google",
          name: profile.displayName,
          email,
          profilePhotoID,
          _id,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

const googleAuthMiddleware: {
  redirect: RequestHandler;
  handleCallback: RequestHandler;
} = {
  redirect(req, res, next) {
    passport.authenticate("google", {
      session: false,
      prompt: "select_account",
      scope: ["profile", "email"],
    })(req, res, next);
  },
  handleCallback(req, res, next) {
    passport.authenticate("google", { session: false }, async (error, user) => {
      try {
        if (error || !user) throw error ?? new Error("Missing user");
        const validationToken = await handleValidationSession(user._id);
        res.redirect(
          `${envVariables.CLIENT_URL}?googleAuthSuccess=${validationToken}`,
        );
      } catch (error) {
        console.error("❌ [Google] Auth failed");
        console.error(error);
        res.redirect(
          `${envVariables.CLIENT_URL}?googleAuthFailed=invalid-authentication`,
        );
      }
    })(req, res, next);
  },
};

export default googleAuthMiddleware;
