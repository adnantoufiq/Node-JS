const path = require("path");
const multer = require("multer");

//folder destination
const UPLOAD_FOLDER = path.join(__dirname, "../uploads/");
const normalize_path_folder = path.normalize(UPLOAD_FOLDER);

//disk storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, normalize_path_folder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname.replace(fileExt, "").toUpperCase();
    // .split(" ")
    // .join("_") + Date.now();
    cb(null, fileName + fileExt);
  },
});

module.exports = {
  storage,
};
