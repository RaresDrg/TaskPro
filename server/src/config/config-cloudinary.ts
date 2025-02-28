import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "./config-env";

const uploadOnCloud = async (
  file: Express.Multer.File,
  userId: string,
  name: string
) => {
  try {
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: userId,
          display_name: name,
          asset_folder: "TaskPro/users",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(file.buffer);
    });

    console.log("File successfully uploaded on Cloudinary");
    return (uploadResult as { secure_url: string }).secure_url;
  } catch (error) {
    console.error(error);

    const errorMessage = `Failed to upload file on Cloudinary: ${
      (error as { message: string }).message
    }`;
    throw new Error(errorMessage);
  }
};

export default uploadOnCloud;
