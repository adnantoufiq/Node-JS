const multer = require("multer");
const { storage } = require("../nameStorage/storage-filename-modifiers");
const { imageFileSize } = require("../fileSize/all-file-size-define");

//multer setup all dependency
const imageValidation = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const _files = ["png", "jpeg", "jpg", "gif", "svg", "webp"];
    const _file_types = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];

    // Get the extension of the uploaded file
    const file_extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    // console.log(file_extension);

    if (
      !_files.includes(file_extension) ||
      !_file_types.includes(file.mimetype)
    ) {
      cb(new Error("Invalid Data"));
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: imageFileSize,
  },
});

module.exports = {
  imageValidation,
};
