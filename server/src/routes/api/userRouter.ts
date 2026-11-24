import { Router } from "express";
import { userController } from "../../controllers/index.js";
import {
  authSessionMiddleware,
  profilePhotoMiddleware,
} from "../../middlewares/index.js";

const router = Router();

router.patch("/theme", authSessionMiddleware, userController.updateTheme);
router.patch(
  "/profile",
  [authSessionMiddleware, profilePhotoMiddleware],
  userController.updateProfile,
);

export default router;
