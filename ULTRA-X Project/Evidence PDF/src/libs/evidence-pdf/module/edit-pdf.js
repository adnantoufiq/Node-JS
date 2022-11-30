const { writePDF } = require("./write-pdf");
const { jsPDF } = require("jspdf");

const editPDF = (req, res) => {
  let pdfData = req.body.pdfData;
  console.log(pdfData)
  for (let i = 0; i < pdfData.length; i++) {
    const document = new jsPDF({
      orientation: "portrait",
      unit: "px",
      compress: true,
      putOnlyUsedFonts: true,
    });
    const getBinaryFont = () => {
      const filePath = path.normalize(`${__dirname}/font/ipaexg.ttf`);
      console.log(filePath);
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
};

module.exports = {
  editPDF,
};
