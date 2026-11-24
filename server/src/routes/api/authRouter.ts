import { Router } from "express";
import { authController } from "../../controllers/index.js";
import {
  authSessionMiddleware,
  validationSessionMiddleware,
  googleAuthMiddleware,
} from "../../middlewares/index.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/logout", authSessionMiddleware, authController.logout);

router.post("/forgot-password", authController.forgotPassword);
router.patch(
  "/update-password",
  validationSessionMiddleware,
  authController.updatePassword,
);

router.get("/google", googleAuthMiddleware.redirect);
router.get("/google/callback", googleAuthMiddleware.handleCallback);
router.post(
  "/google/finalize",
  validationSessionMiddleware,
  authController.finalizeGoogleAuth,
);

export default router;
