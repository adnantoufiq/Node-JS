const express = require("express");
const generatePdf = express.Router();

const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const {
  checkEvidencePdfBodyDataValidity,
} = require("./middleware/check-evidence-pdf-ody-data-validity");

const {
  deleteGeneratePDF,
  pdfName,
  pdfId,
} = require("./sql_query/query");


const { writePDF } = require("./module/write-pdf");
const {editPDF} = require('./module/edit-pdf')

const { pool } = require("./db/pool");

/**
 * Generate pdf using jspdf instance based on the pdfData
 * @param {Object} pdfData The pdf data to generate pdf
 * @param {jsPDF} document The document that holds jspdf instance
 */

generatePdf.post(
  "/generate-pdf",
  checkEvidencePdfBodyDataValidity,
  (req, res) => {
    try {
      let pdfData = req.body.pdfData;
      for (let i = 0; i < pdfData.length; i++) {
        const document = new jsPDF({
          orientation: "portrait",
          unit: "px",
          compress: true,
          putOnlyUsedFonts: true,
        });
        const getBinaryFont = () => {
          const filePath = path.normalize(`${__dirname}/font/ipaexg.ttf`);
          const fileContent = fs.readFileSync(filePath, "binary");
          return fileContent;
        };
        // add custom font
        const japaneseFont = getBinaryFont();
        document.addFileToVFS("ipaexg.ttf", japaneseFont);
        document.addFont("ipaexg.ttf", "ipaexg", "normal");
        document.addFont("ipaexg.ttf", "ipaexg", "bold");
        document.setFont("ipaexg", "normal");

        if (i === 0) {
          writePDF(pdfData[i], document);
        }

        if (i > 0) {
          document.deletePage(1);
          document.addPage();
          writePDF(pdfData[i], document);
        }
      }

      // console.log(document);
      return res.status(200).send({
        status: "success",
        message: `generate-pdf-successfully`,
      });
    } catch (error) {
      console.log("error", error);
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
      const fileName = name[0].FILE_NAME;

      const dirName = path.join(__dirname, "evidence");
      const evidencePath = `${dirName}/`;

      fs.readdir(dirName, function (err, data) {
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

module.exports = {
  generatePdf,
};
