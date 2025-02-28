import multer from "multer";
import { Request } from "express";

const profilePhotoMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5000000 },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const fileType = file.mimetype.split("/", 1).join("");
    if (fileType !== "image") {
      cb(new Error("Please provide an image file."));
    } else {
      cb(null, true);
    }
  },
}).single("profilePhoto");

export { profilePhotoMiddleware };
