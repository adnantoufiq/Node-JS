const multer = require("multer");
const { storage } = require("../nameStorage/storage-filename-modifiers");
const { logFileSize } = require("../fileSize/all-file-size-define");

const logValidation = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "log") {
      if (file.mimetype === "application/octet-stream") {
        cb(null, true);
      } else {
        cb(new Error("ONly .log file allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
  limits: {
    fileSize: logFileSize,
  },
});

module.exports = {
  logValidation,
};
