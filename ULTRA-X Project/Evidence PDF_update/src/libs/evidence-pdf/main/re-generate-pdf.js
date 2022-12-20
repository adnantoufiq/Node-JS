const { updatePDF } = require("./update-pdf");
const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const reGeneratePdf = (pdfData, value) => {
  let i = 0;

  const getBinaryFont = () => {
    const filePath = path.normalize(__dirname + "/../font/ipaexg.ttf");
    const fileContent = fs.readFileSync(filePath, "binary");
    return fileContent;
  };
  const startTime = new Date();
  for (i = 0; i < pdfData.length; i++) {
    const document = new jsPDF({
      orientation: "portrait",
      unit: "px",
      compress: true,
      putOnlyUsedFonts: true,
    });

    // add custom font
    const japaneseFont = getBinaryFont();
    document.addFileToVFS("ipaexg.ttf", japaneseFont);
    document.addFont("ipaexg.ttf", "ipaexg", "normal");
    document.addFont("ipaexg.ttf", "ipaexg", "bold");
    document.setFont("ipaexg", "normal");

    // send pdf data
    updatePDF(pdfData[i], document, startTime, value);
  }
};
module.exports = {
  reGeneratePdf,
};
