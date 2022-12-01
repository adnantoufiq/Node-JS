const { writePDF } = require('./generate-pdf')
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const reGeneratePdf = (pdfData, tableId) => {
    let i = 0;
    let count = 0;
    // const totalPdf = pdfData.length;
    // console.log(tableId);
    const getBinaryFont = () => {
        const filePath = path.normalize(__dirname + "/../font/ipaexg.ttf");
        const fileContent = fs.readFileSync(filePath, 'binary');
        return fileContent;
    }
    const startTime = new Date();
    for (i = 0; i < pdfData.length; i++) {
        // console.log(pdfData[i].uxsh_detail_table_id);
        const document = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            compress: true,
            putOnlyUsedFonts: true
        });
        // console.log(tableId);

        // add custom font
        const japaneseFont = getBinaryFont();
        document.addFileToVFS('ipaexg.ttf', japaneseFont);
        document.addFont('ipaexg.ttf', 'ipaexg', 'normal');
        document.addFont('ipaexg.ttf', 'ipaexg', 'bold');
        document.setFont('ipaexg', 'normal');

        // send pdf data
        if (tableId != pdfData[i].uxsh_detail_table_id) {
            // console.log("from if: ", count);
            // count++;
            continue;

        } else {
            // console.log("from else: ", tableId);
            writePDF(pdfData[i], document, startTime)

        }

    }
}
module.exports = {
    reGeneratePdf
}