import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../services/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
     params: async (req) => ({
        folder: `blogger/${req.user._id}`,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    }),
});

const upload = multer({
    storage,
});

export default upload;