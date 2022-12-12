const multer = require("multer");
const { storage } = require("../nameStorage/storage-filename-modifiers");
const { imageFileSize } = require("../fileSize/all-file-size-define");

//multer setup all dependency

/**
 * Represents a image validation module.
 * @Author -Ariful_Islam_Toufiq
 * @Image_validation_variable
 * @storage_select
 * @image_type_filter
 * @file_size_limits
 */
const imageValidation = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const _file_types = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];

    if (!_file_types.includes(file.mimetype)) {
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
