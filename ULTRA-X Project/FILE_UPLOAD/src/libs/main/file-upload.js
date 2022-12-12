const express = require("express");
const fileUploads = express.Router();
const { imageValidation } = require("../validation/image-file-validation");
const { logValidation } = require("../validation/log-file-validation");
const { errorCheck } = require("../middleware/check-error");

/**
 * Represents a route.
 * @Author -Ariful Islam Toufiq
 * @image_file_upload_route
 */
fileUploads.post(
  "/image-file",

  imageValidation.array("imageFile", 20),// multiple array of image upload with 20 limits 
  errorCheck, // middleware

  (req, res) => {
    console.log(req.files);
    res.send("success");
  }
);

/**
 * Represents a route.
 * @Author -Ariful Islam Toufiq
 * @log_file_upload_route
 */
fileUploads.post(
  "/log-file",

  logValidation.array("log", 50), // multiple array of log file upload with 50 limits 
  errorCheck,   // middleware

  (req, res) => {
    console.log(req.files);
    res.send("success");
  }
);

module.exports = {
  fileUploads,
};
