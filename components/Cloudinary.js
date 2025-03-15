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



export const uploadVideoToCloudinary = async (videoUri) => {
    const data = new FormData();
    const CLOUD_NAME = "da4moxwz3"; // שם החשבון שלך ב-Cloudinary
    const UPLOAD_PRESET = "tribe-app"; // שם ה-Upload Preset שלך

    // המרת ה-URI של הסרטון לפורמט שזמין ב-Fetch
    data.append("file", {
        uri: videoUri,
        type: "video/mp4",  // אם סוג הווידאו שונה, יש לשנות את ה-type
        name: "video.mp4"
    });

    // הוספת פרמטרים נדרשים
    data.append("upload_preset", UPLOAD_PRESET);  // החלף ב-upload_preset שלך
    data.append("cloud_name", CLOUD_NAME);      // החלף ב-cloud_name שלך

    try {
        // שליחת הבקשה ל-Cloudinary
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();
        return result.secure_url; // מחזיר את ה-URL של הווידאו שהועלה
    } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
        throw error;  // זורק את השגיאה עבור טיפול נוסף במקום אחר בקוד
    }
};



export const deleteVideoFromCloudinary = async (publicId) => {
    const CLOUD_NAME = "da4moxwz3"; // שם החשבון שלך ב-Cloudinary
    const API_KEY = "845138355419153"; // החלף במפתח שלך
    const API_SECRET = "nOCzr57Wbhj7xuMCSo7ysb1l5bI"; // החלף בסוד שלך


    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/destroy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "public_id": publicId,    // ה־public_id של הווידאו שאתה רוצה למחוק
            "api_key": API_KEY, // מפתח ה-API שלך מ-Cloudinary
            "api_secret": API_SECRET  // סוד ה-API שלך (אם יש צורך)
        })
    });

    const result = await response.json();
    if (result.result === 'ok') {
        console.log("Video deleted successfully!");
    } else {
        console.error("Error deleting video:", result);
    }
};
