const express = require("express");
const generatePdf = express.Router();

const {
  checkEvidencePdfBodyDataValidity,
} = require("./middleware/check-evidence-pdf-body-data-validity");
const { initGenerateFile } = require("./main/init-generate-pdf");
const { pdfId } = require("./sql_query/query");
const { checkPdfAndDelete } = require("./main/delete-pdf");
const { pool } = require("./db/pool");
const { deleteGeneratePDF } = require("./sql_query/query");
const { reGeneratePdf } = require("./main/re-generate-pdf");

/**
 * @author Ariful Islam Toufiq
 */
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

// delete pdf API

generatePdf.delete("/delete-pdf/:id", checkPdfAndDelete, async (req, res) => {
  const value = req.params.id;
  const [PDFid] = await pool.query(pdfId, value);
  await pool.query(deleteGeneratePDF, value);
  return res.status(500).send({
    status: "success",
    message: "pdf-delete-successfully",
  });
});

// re-generate pdf API
generatePdf.post(
  "/re-generate-pdf/:id",
  checkEvidencePdfBodyDataValidity,
  checkPdfAndDelete,
  async (req, res) => {
    const value = req.params.id;
    const pdfData = req.body.pdfData;

    try {
      setTimeout(function () {
        reGeneratePdf(pdfData, value);
      }, 50);
      return res.status(500).send({
        status: "success",
        message: "re-generate-pdf-successfully",
      });
    } catch (error) {
      return res.status(500).send({
        status: "failed",
        message: "internal-server-error",
      });
    }
  }
);

// generate xlsx-file API
// generatePdf.get("/generate-xlsx-file", async (req, res) => {
//   try {
//     const [result] = await pool.query(getTableInfo);
//     const writeSheet = XLSX.utils.json_to_sheet(result);
//     const writeBook = XLSX.utils.book_new();

//     const dirName = path.join(__dirname, "./evidence-PDF/");
//     XLSX.utils.book_append_sheet(writeBook, writeSheet, "Result");
//     //buffer generate
//     XLSX.write(writeBook, { bookType: "xlsx", type: "buffer" });
//     //binary generate
//     XLSX.write(writeBook, { bookType: "xlsx", type: "binary" });
//     // download file
//     XLSX.writeFile(writeBook, `${dirName}/evidence-pdf-info.xlsx`);
//     const file = `${dirName}/evidence-pdf-info.xlsx`;
//     res.download(file);
//   } catch (error) {
//     return res.status(500).send({
//       error,
//       status: "failed",
//       message: "internal-server-error",
//     });
//   }
// });

module.exports = {
  generatePdf,
};
