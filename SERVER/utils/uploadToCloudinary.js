import cloudinary from "../config/cloudinary.js"; 

export const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "user_profiles" }, 
      (error, result) => {
        if (error) {
          reject(error); 
        } else {
          resolve(result);
        }
      }
    ).end(file.buffer); 
  });
};
