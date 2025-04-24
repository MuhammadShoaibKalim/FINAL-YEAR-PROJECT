import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = req.body.uploadFolder || 'default_folder';
    return {
      folder,
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'bmp'],
      transformation: [{ width: 300, height: 300, crop: 'limit' }],
    };
  },
});

const upload = multer({ storage });

export default upload;
