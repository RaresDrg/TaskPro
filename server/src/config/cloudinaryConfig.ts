import { createError } from "../utils/createError.js";
import {
  v2 as cloudinary,
  type UploadApiOptions,
  type UploadApiResponse,
} from "cloudinary";

type UploadData = {
  source: { file: Express.Multer.File } | { url: string };
  options: UploadApiOptions;
};

async function uploadOnCloudinary({ source, options }: UploadData) {
  try {
    if ("file" in source) {
      return await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(options, (error, result) => {
            if (error) reject(error);
            else if (!result) reject(new Error("Returned no result"));
            else resolve(result);
          })
          .end(source.file.buffer);
      });
    }

    return await cloudinary.uploader.upload(source.url, options);
  } catch (error) {
    console.error("❌ [Cloudinary] Upload failed");
    console.error(error);
    throw createError("BadGatewayError");
  }
}

export default uploadOnCloudinary;
