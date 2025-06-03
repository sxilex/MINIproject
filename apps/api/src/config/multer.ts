import multer from "multer";
import path from "path";
import fs from "fs";

// Get the current working directory (root of your project)
const imagePath = path.join(process.cwd(), "public", "images");

// Ensure the folder exists
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, imagePath); // Use the path based on the current working directory
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});
