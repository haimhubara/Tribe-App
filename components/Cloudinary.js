import { sha1 } from "js-sha1";
export const uploadImageToCloudinary = async (generatedImage) => {
    if (!generatedImage) {
        alert("No image to upload!");
        return;
    }
    
    const CLOUD_NAME = "da4moxwz3"; // שם החשבון שלך ב-Cloudinary
    const UPLOAD_PRESET = "tribe-app"; // שם ה-Upload Preset שלך
    
    const formData = new FormData();
    formData.append("file", {
        uri: generatedImage,
        type: "image/jpeg",
        name: "event_image.jpg",
    });
    formData.append("upload_preset", UPLOAD_PRESET); // חובה שה-Upload Preset יהיה נכון!
    
    try {
        const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
        );
    
        const result = await response.json();
    
        if (!result.secure_url) {
        throw new Error("Upload failed: " + JSON.stringify(result));
        }
        return result.secure_url;
    } catch (error) {
        console.error("Upload Error:", error);
        alert("Failed to upload image: " + error.message);
        return null;
    }
};

const CLOUD_NAME = "da4moxwz3"; // החלף בשם החשבון שלך
const API_KEY = "845138355419153"; // החלף במפתח שלך
const API_SECRET = "nOCzr57Wbhj7xuMCSo7ysb1l5bI"; // החלף בסוד שלך

export const deleteImageFromCloudinary = async (publicId) => {
  try {
      const timestamp = Math.floor(Date.now() / 1000); // זמן נוכחי
      const signatureString = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
      
      // יצירת חתימה באמצעות SHA1
      const signature = sha1(signatureString);

      const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  public_id: publicId,
                  api_key: API_KEY,
                  timestamp,
                  signature,
              }),
          }
      );

      const result = await response.json();

      if (result.result === "ok") {
          return true;
      } else {
          console.error("Failed to delete image:", result);
          return false;
      }
  } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      return false;
  }
};


