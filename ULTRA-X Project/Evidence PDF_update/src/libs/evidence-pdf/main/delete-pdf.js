const { pool } = require("../db/pool");
const fs = require("fs");
const path = require("path");
const {
  pdfName,
  gettableId,
  pdfId,
} = require("../sql_query/query");

const checkPdfAndDelete =  async (req,  res, next) => {
  const value = req.params.id;
  const [PDFid] = await pool.query(pdfId, value);


  try {
    if (PDFid && typeof PDFid === "object" && PDFid.length > 0) {
      const [result] = await pool.query(gettableId, value);
      const tableId = result[0].UXHS_DETAIL_TABLE_ID;
      const [name] = await pool.query(pdfName, value);
      console.log({ name });

      const fileName = name[0].file_name;
      const evidencePath = path.join(__dirname, "../evidence-PDF/");

      fs.readdir(evidencePath, function (err, data) {
        if (data.length == 0) {
          return res.status(404).send({
            status: "failed",
            message: "Directory is Empty",
            err,
          });
        } else {
          fs.unlink(evidencePath + fileName, async function (err) {
            if (err) {
              return res.status(404).send({
                status: "failed",
                message: "file-not-found",
              });
            } else {
               next()
            }
          });
        }
      });
    } else {
      return res.status(500).send({
        status: "failed",
        message: "ID-not-found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }

};
module.exports = {
  checkPdfAndDelete,
};
