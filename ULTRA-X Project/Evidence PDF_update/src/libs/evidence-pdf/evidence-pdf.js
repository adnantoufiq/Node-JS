const express = require("express");
const generatePdf = express.Router();
const XLSX = require("xlsx");
const {
  checkEvidencePdfBodyDataValidity,
} = require("./middleware/check-evidence-pdf-ody-data-validity");
const { initGenerateFile } = require("./main/init-generate-pdf");
const { pdfId } = require("./sql_query/query");
// const { deletePdf } = require("./main/delete-pdf");
const { pool } = require("./db/pool");
const fs = require("fs");
const path = require("path");
const { deleteGeneratePDF, pdfName, gettableId } = require("./sql_query/query");
const { reGeneratePdf } = require("./main/re-generate-pdf");
const { getTableInfo } = require('./sql_query/query')

// Author Ariful Islam Toufiq
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
  const value = req.params.id;
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
              return res.status(500).send({
                status: "success",
                message: "pdf-delete-successfully",
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
                setTimeout(function () {
                  reGeneratePdf(pdfData, tableId, value);
                }, 50);
                return res.status(500).send({
                  status: "success",
                  message: "re-generate-pdf-successfully",
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
      return res.status(500).send({
        status: "failed",
        message: "internal-server-error",
      });
    }
  }
);




generatePdf.get('/generate-xlsx-file', async (req, res) => {

  

  try{
    const [result] = await pool.query(getTableInfo);
    const writeSheet = XLSX.utils.json_to_sheet(result);
    const writeBook = XLSX.utils.book_new();

    const dirName = path.join(__dirname, './evidence/')
    XLSX.utils.book_append_sheet(writeBook, writeSheet, "Result");
    //buffer generate
    XLSX.write(writeBook, { bookType: "xlsx", type: "buffer" });
    //binary generate
    XLSX.write(writeBook, { bookType: "xlsx", type: "binary" });
    // download file
    XLSX.writeFile(writeBook, `${dirName}/evidence-pdf-info.xlsx`);
    
    return res.status(500).send({
      status: "success",
      message: "generate-evidence-file-xlsx-successfully",
    });


  }catch (error) {
    return res.status(500).send({
      status: "failed",
      message: "internal-server-error",
    });
  }
 

})








module.exports = {
  generatePdf,
};
