import multer, { type FileFilterCallback } from "multer";
import { createError } from "../utils/index.js";
import {
  PROFILE_PHOTO_MAX_SIZE,
  PROFILE_PHOTO_TYPES,
} from "../constants/index.js";

const profilePhotoMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: PROFILE_PHOTO_MAX_SIZE },
  fileFilter: (_, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (!PROFILE_PHOTO_TYPES.includes(file.mimetype)) {
      callback(
        createError(
          "ValidationError",
          "Profile photo must be an image. Supported formats: JPEG, PNG, or WebP",
        ),
      );
    } else callback(null, true);
  },
}).single("profilePhoto");

export default profilePhotoMiddleware;
