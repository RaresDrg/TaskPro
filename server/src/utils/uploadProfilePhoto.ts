import { uploadOnCloudinary } from "../config/index.js";
import type { UserType } from "../types/index.js";

type ProfilePhotoData = {
  source: { file: Express.Multer.File } | { url: string };
  user: Pick<UserType, "_id" | "name">;
};

export async function uploadProfilePhoto({ source, user }: ProfilePhotoData) {
  const uploadedFile = await uploadOnCloudinary({
    source,
    options: {
      display_name: user.name,
      public_id: user._id.toString(),
      overwrite: true,
      resource_type: "image",
      asset_folder: "TaskPro/users",
    },
  });

  return `v${uploadedFile.version}/${uploadedFile.public_id}`;
}
