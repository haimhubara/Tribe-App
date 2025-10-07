import { sha1 } from "js-sha1";
import {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_UPLOAD_PRESET
} from '@env';

const CLOUD_NAME = CLOUDINARY_CLOUD_NAME;
const API_KEY =    CLOUDINARY_API_KEY;
const API_SECRET =   CLOUDINARY_API_SECRET;
const UPLOAD_PRESET = CLOUDINARY_UPLOAD_PRESET;


export const uploadImageToCloudinary = async (generatedImage) => {
    if (!generatedImage) {
        alert("No image to upload!");
        return;
    }
    const formData = new FormData();
    formData.append("file", {
        uri: generatedImage,
        type: "image/jpeg",
        name: "event_image.jpg",
    });
    formData.append("upload_preset", UPLOAD_PRESET); 

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
        const timestamp = Math.floor(Date.now() / 1000);
        const signatureString = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;

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

    data.append("file", {
        uri: videoUri,
        type: "video/mp4", 
        name: "video.mp4"
    });

    data.append("upload_preset", UPLOAD_PRESET); 
    data.append("cloud_name", CLOUD_NAME);     

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();
        return result.secure_url; 
    } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
        throw error; 
    }
};



export const deleteVideoFromCloudinary = async (publicId) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
    const signature = sha1(signatureString);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", API_KEY);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/destroy`,
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await response.json();

        if (result.result === "ok") {
            return true;
        } else {
            console.error("Error deleting video:", result);
            return false;
        }
    } catch (error) {
        console.error("Error deleting video from Cloudinary:", error);
        return false;
    }
};