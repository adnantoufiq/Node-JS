const multer = require("multer");
const { storage } = require("../nameStorage/storage-filename-modifiers");
const { logFileSize } = require("../fileSizeType/file-size-type-define");
/**
 * Represents a logfile validation module.
 * @Author Ariful_Islam_Toufiq
 * @storage_select
 * @logFile_type_filter
 * @file_size_declare
 */
const logValidation = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/octet-stream") {
      cb(null, true);
    } else {
      cb(new Error("ONly .log file allowed!"));
    }
  },
  limits: {
    fileSize: logFileSize,
  },
});

module.exports = {
  logValidation,
};
