const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
import { ResponseType } from "@/type";
import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";

export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    // If file is already a URL (string), just return it
    if (typeof file === "string") {
      return { success: true, data: file };
    }

    // If file object with URI is provided
    if (file && file.uri) {
      const formData = new FormData();

      formData.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file.uri.split("/").pop() || "file.jpg",
      } as any);

      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      return { success: true, data: response?.data?.secure_url };
    }

    // If none of the above, return failure
    return { success: true};

  } catch (error: any) {
    console.log("Error uploading image:", error);
    return {
      success: false,
      msg: error.message || "Error uploading image",
    };
  }
};

// Get profile image URL or fallback to default avatar
export const getProfileImage = (file: any) => {
  if (file) {
    if (typeof file === "string") {
      return file;
    }
    if (typeof file === "object" && file.uri) {
      return file.uri;
    }
  }

  return require("../assets/images/defaultAvatar.png");
};
  