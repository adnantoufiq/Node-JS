const multer = require("multer");
const { storage } = require("../nameStorage/storage-filename-modifiers");
const { logFileSize } = require("../fileSize/all-file-size-define");
/**
 * Represents a logfile validation module.
 * @Author Ariful_Islam_Toufiq
 * @storage_select
 * @logfile_type_filter
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
