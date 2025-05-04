import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = req.body.uploadFolder || 'default_folder';

    const originalName = file.originalname.split(".")[0]; 

    return {
      folder,
      public_id: originalName,
      resource_type: 'auto',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'bmp', 'pdf', 'doc', 'docx'],
    };
  },
});


const upload = multer({ storage });

export default upload;
