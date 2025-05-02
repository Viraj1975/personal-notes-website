// backend/src/utils/cloudinary.js
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    if(!localFilePath) return null;

    try{
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        fs.unlinkSync(path.resolve(localFilePath));
        return result;
    } 
    catch(error){
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(path.resolve(localFilePath));
        }
        console.error("Cloudinary upload error:",error);
        return null;
    }
};

export {uploadOnCloudinary};
