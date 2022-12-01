const express = require("express");
const generatePdf = express.Router();

const {
  checkEvidencePdfBodyDataValidity,
} = require("./middleware/check-evidence-pdf-ody-data-validity");
const { initGenerateFile } = require("./main/init-generate-pdf");
const { pdfId } = require("./sql_query/query");
const { deletePdf } = require("./main/delete-pdf");
const { pool } = require("./db/pool");
const fs = require("fs");
const path = require("path");
const {
  deleteGeneratePDF,
  pdfName,
  getFileInfo,
  gettableId,
} = require("./sql_query/query");
const { reGeneratePdf } = require("./main/re-generate-pdf");

// Author Md. Majedul Islam
// Generate PDF API
generatePdf.post(
  "/generate-pdf",
  checkEvidencePdfBodyDataValidity,
  (req, res) => {
    const pdfData = req.body.pdfData;
    try {
      initGenerateFile(pdfData);
      return res.status(200).send({
        status: "success",
        message: "generate-pdf-successfully",
      });
    } catch (error) {
      return res.status(500).send({
        status: "failed",
        message: "internal-server-error",
      });
    }
  }
);

generatePdf.delete("/delete-pdf/:id", async (req, res) => {
  try {
    const value = req.params.id;
    const [PDFid] = await pool.query(pdfId, value);

    if (PDFid && typeof PDFid === "object" && PDFid.length > 0) {
      const [name] = await pool.query(pdfName, value);
      const fileName = name[0].file_name;

      const evidencePath = path.join(__dirname, "evidence/");
      //   const evidencePath = `${dirName}/`;

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
              const query = deleteGeneratePDF;

              const values = [req.params.id];

              const [result] = await pool.query(query, values);

              return res.status(200).send({
                status: "success",
                message1: "PDF-deleted-successfully",
                message2: "Database-information-deleted-successfully",
              });
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
    console.log("error", error);
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
});

generatePdf.post(
  "/re-generate-pdf/:id",
  checkEvidencePdfBodyDataValidity,
  async (req, res) => {
    const value = req.params.id;
    const pdfData = req.body.pdfData;

    const [PDFid] = await pool.query(pdfId, value);

    try {
      if (PDFid && typeof PDFid === "object" && PDFid.length > 0) {
        const [result] = await pool.query(gettableId, value);
        const tableId = result[0].UXHS_DETAIL_TABLE_ID;
        const [name] = await pool.query(pdfName, value);
        const fileName = name[0].file_name;

        const evidencePath = path.join(__dirname, "evidence/");

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
                await pool.query(deleteGeneratePDF, value);
              }
            });
          }
        });
        // console.log(tableId);
        setTimeout(function () {
          reGeneratePdf(pdfData, tableId);
        }, 50);

        return res.status(500).send({
          status: "success",
          message: "re-generate-pdf-successfully",
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
  }
);
module.exports = {
  generatePdf,
};
