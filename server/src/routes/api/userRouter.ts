import express from "express";
import userController from "../../controllers/userController";
import {
  jwtAuthMiddleware,
  profilePhotoMiddleware,
  validateTokenMiddleware,
} from "../../middlewares";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.delete("/logout", jwtAuthMiddleware, userController.logout);

router.post("/forgot-password", userController.forgotPassword);
router.patch(
  "/update-password",
  validateTokenMiddleware,
  userController.updatePassword
);

router.post("/support", jwtAuthMiddleware, userController.reachSupport);
router.patch("/theme", jwtAuthMiddleware, userController.updateTheme);
router.put(
  "/profile",
  [jwtAuthMiddleware, profilePhotoMiddleware],
  userController.updateProfile
);

export default router;
