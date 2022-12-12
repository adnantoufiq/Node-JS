const multer = require("multer");

/**
 * Represents a checkError Middleware.
 * @Author Ariful Islam Toufiq
 * @Middleware for  multer specific error
 * @fiel_upload_check_error
 */
const errorCheck = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).send({
        err,
        status: "failed",
        message: "file-upload-error",
      });
    } else {
      return res.send(err?.message);
    }
  } else {
    next();
  }
};

module.exports = {
  errorCheck,
};
