
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

export const deleteImageFromCloudinary = async (publicId) => {
    try {
        const formData = new FormData();
        formData.append("public_id", publicId);
        formData.append("api_key", "your-api-key");
        formData.append("timestamp", Math.floor(Date.now() / 1000));

        const stringToSign = `public_id=${publicId}&timestamp=${formData.get("timestamp")}&your-api-secret`;
        const hash = require("crypto").createHash("sha1").update(stringToSign).digest("hex");
        formData.append("signature", hash);

        const response = await fetch(`https://api.cloudinary.com/v1_1/your-cloud-name/image/destroy`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log("Cloudinary Delete Response:", result);
        return result;
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
    }
};




