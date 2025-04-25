import { UserDataType } from "../type";
import { ResponseType } from "../type";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    // If image has a URI, upload it to Cloudinary
    if (updatedData?.image && (updatedData.image as any)?.uri) {
      const imageUploadRes = await uploadFileToCloudinary(updatedData.image, "users");

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Error uploading image",
        };
      }

      // Update image URL with Cloudinary response
      updatedData.image = imageUploadRes.data;
    }

    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData as any); // cast to 'any' if Firestore complains

    return { success: true, msg: "User updated successfully" };
  } catch (error: any) {
    console.error("Error updating user:", error);
    return { success: false, msg: error?.message };
  }
};
