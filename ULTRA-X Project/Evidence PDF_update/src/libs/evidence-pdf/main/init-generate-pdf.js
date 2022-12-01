const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');
const { differenceInMinutes, differenceInSeconds } = require("date-fns");
const { writePDF } = require('./generate-pdf')


const initGenerateFile = (pdfData) => {

    const startTime = new Date();

    let i = 0;
    const totalPdf = pdfData.length;
    // console.log(totalPdf)


    const getBinaryFont = () => {
        const filePath = path.normalize(__dirname + "/../font/ipaexg.ttf");
        const fileContent = fs.readFileSync(filePath, 'binary');
        return fileContent;
    }

    // fs.appendFile('src/libs/evidence-pdf/timeCount.txt', `Start Time         : ${startTime} \n`,
    //     (err) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     })

    for (i = 0; i < pdfData.length; i++) {
        const document = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            compress: true,
            putOnlyUsedFonts: true
        });
        // add custom font
        const japaneseFont = getBinaryFont();
        document.addFileToVFS('ipaexg.ttf', japaneseFont);
        document.addFont('ipaexg.ttf', 'ipaexg', 'normal');
        document.addFont('ipaexg.ttf', 'ipaexg', 'bold');
        document.setFont('ipaexg', 'normal');

        // send pdf data
        if (i === 0) {
            writePDF(pdfData[i], document, startTime);

        }
        if (i > 0) {
            document.deletePage(1);
            document.addPage();
            writePDF(pdfData[i], document, startTime);
        }

    }
    /**
     * This part is only for testing perpus.
     */
    // const endTime = new Date();
    // fs.appendFile('src/libs/evidence-pdf/timeCount.txt',
    //     `End Time           : ${endTime}\nTotal PDF generate : ${totalPdf}\n`,
    //     (err) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });


    // const timeDifferenceInMinutes = differenceInMinutes(endTime, startTime);
    // const timeDifferenceInSeconds = differenceInSeconds(endTime, startTime);
    // fs.appendFile('src/libs/evidence-pdf/timeCount.txt',
    //     `Time difference    : ${timeDifferenceInMinutes}:${timeDifferenceInSeconds} \n \n`,
    //     (err) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });


}

module.exports = {
    initGenerateFile
}