const express = require("express");
const fileUploads = express.Router();
const { imageValidation } = require("../validation/image-file-validation");
const { logValidation } = require("../validation/log-file-validation");
const { errorCheck } = require("../middleware/check-error");

// image file uploads route
fileUploads.post(
  "/image-file",

  imageValidation.array("imageFile", 20),
  errorCheck,

  (req, res) => {
    console.log(req.files);
    res.send("success");
  }
);

//log file uploads route
fileUploads.post(
  "/log-file",

  logValidation.array("log", 50),
  errorCheck,

  (req, res) => {
    console.log(req.files);
    res.send("success");
  }
);

module.exports = {
  fileUploads,
};
