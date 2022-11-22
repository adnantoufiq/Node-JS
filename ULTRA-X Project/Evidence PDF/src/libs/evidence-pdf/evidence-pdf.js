const express = require('express');
const generatePdf = express.Router();

const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');
const { parseEvidencePdfBodyData } = require('./middleware/parse-evidence-pdf-body-data')
const { checkEvidencePdfBodyDataValidity } = require('./middleware/check-evidence-pdf-ody-data-validity')
//const { addFooters } = require('./get-page-no/get-page-no') // Not used yet
const { getXOffset } = require('./get-offset/get-offset')
var { generateEraseData, eraseTableHeaders } = require('./table/erase-info')
var { generateWorkerData, workerHeaders } = require('./table/worker-table')
var { generateResponsibleData, responsibleHeaders } = require('./table/responsible-table')
var { generateDataTargetDevice, targetTableHeaders } = require('./table/target-device')
const { logo } = require('./images/logo');
const { insertTableQuery, deleteGeneratePDF } = require("./sql_query/query");

const { pool } = require("./db/pool");




/**
 * Generate pdf using jspdf instance based on the pdfData
 * @param {Object} pdfData The pdf data to generate pdf
 * @param {jsPDF} document The document that holds jspdf instance
 */
const writePDF = async (pdfData, document) => {

    const getDate = new Date();
    let day = (getDate.getDate() + '').padStart(2, '0');
    let month = (getDate.getMonth() + 1 + '').padStart(2, '0');
    const year = (getDate.getFullYear() + '').padStart(2, '0');
    let hours = (getDate.getHours() + '').padStart(2, '0');;
    let minutes = (getDate.getMinutes() + '').padStart(2, '0');
    let seconds = (getDate.getSeconds() + '').padStart(2, '0');
    const leftMargin = 50;
    const _date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}:${seconds}`;

    document.setFontSize(9);
    const date = `作成⽇：     ${year} 年 ${month} ⽉ ${day} ⽇`;
    document.text(date, 300, 60)
        .addImage(logo, 363, 70, 40, 30, 'FAST')  // add logo

        // set line width and font size
        .setLineWidth(0.5)
        .setFontSize(12)
        .text('御中', leftMargin, 110)
        .setFontSize(9)
        .text('〒101-0032', 246, 137)
        .text('東京都千代⽥区岩本町3-9-17 スリーセブンビル8F', 247, 148)
        .text('株式会社ウルトラエックス', 320, 159)
        .text('営業部担当 :', 362, 170)
        .text('Tel:03-5823-5620 Fax:03-5823-5667', 278, 181);

    // centralized main text using the function
    const text1 = "データ消去証明書";
    const xOffset = getXOffset(text1, document);
    document.setFontSize(12).text(text1, xOffset, 205)
        .setFontSize(9);
    const longText = 'この度、貴社よりご依頼いただきました電⼦記録媒体のソフトウェア消去を、下記の内容で⾏いましたことを証明致します。';


    // custom text wrapper
    const textLine = document.splitTextToSize(longText, (455 - leftMargin - 110));
    document.text(textLine, 60, 228);


    // Add erase-info table
    if (pdfData.company_address.length > 30) {
        pdfData.company_address = pdfData.company_address.slice(0, 27) + '...';
        document.table(leftMargin, 250, generateEraseData(pdfData), eraseTableHeaders, {
            printHeaders: false,
            css: {
                "font-size": 0.5
            },
        });
    } else {
        document.table(leftMargin, 250, generateEraseData(pdfData), eraseTableHeaders, {
            printHeaders: false,
            css: {
                "font-size": 0.5
            },
        });
    }


    // add worker table
    document.table(325, 240, generateWorkerData(), workerHeaders, {
        headerBackgroundColor: 'white',
        padding: 5
    });

    //add responsible table
    document.table(325, 320, generateResponsibleData(1), responsibleHeaders, {
        headerBackgroundColor: 'white',
        padding: 5
    });

    document.setFontSize(9)
        .text('対象機器は以下の通りです。', leftMargin, 378);

    //add target device table
    document.table(leftMargin, 381, generateDataTargetDevice(pdfData), targetTableHeaders, {
        headerBackgroundColor: 'white',
        css: {
            "font-size": 0.6,
        }
    });

    document.text('特記事項', leftMargin, 532);

    //custom comment box
    document.rect(leftMargin, 535, 350, 50);

    // Set comment data
    let commentText = pdfData.comment;
    if (commentText.length > 245) {
        commentText = commentText.slice(0, 245) + '...';
    }
    const textInLine = document.splitTextToSize(commentText, (455 - 55 - 63));
    document.text(textInLine, 60, 550);

    //addFooters(document);

    // save pdf
    const dirName = path.join(__dirname, "evidence");

    document.save(`${dirName}/Evidence-PDF _ ${pdfData.processing_number}.pdf`);
    // console.log(pdfFile)
    // _ ${_date} _ ${hours}-${minutes}-${seconds}
    const fileName = `Evidence-PDF _ ${pdfData.processing_number}.pdf`;
    const dirName1 = path.join(__dirname, "evidence");
    // const files = fs.readdirSync(dirName1);
    // const fileName = JSON.stringify(files);
    // let getFileName = JSON.parse(fileName);
    // getFileName = getFileName;
    // // console.log(getFileName)
    const getFilePath = `${dirName1}/Evidence-PDF _ ${pdfData.processing_number}.pdf`;

    const values = [fileName, getFilePath];
    // console.log(insertTableQuery);
    // console.log(values);
    const [result] = await pool.query(insertTableQuery, values);
}


// Author Md. Majedul Islam
// Generate PDF API 
generatePdf.post(
    '/generate-pdf',
    checkEvidencePdfBodyDataValidity,
    (req, res) => {

        const pdfData = req.body.pdfData;

        const document = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            compress: true,
            putOnlyUsedFonts: true
        });
        const getBinaryFont = () => {
            const filePath = path.normalize(`${__dirname}/font/ipaexg.ttf`);
            const fileContent = fs.readFileSync(filePath, 'binary');
            return fileContent;
        }
        // add custom font
        const japaneseFont = getBinaryFont();
        document.addFileToVFS('ipaexg.ttf', japaneseFont);
        document.addFont('ipaexg.ttf', 'ipaexg', 'normal');
        document.addFont('ipaexg.ttf', 'ipaexg', 'bold');
        document.setFont('ipaexg', 'normal');

        // writePDF(pdfData[1], document);
        for (let i = 0; i < pdfData.length; i++) {

            if (i === 0) {
                writePDF(pdfData[i], document);
            }
            if (i > 0) {
                document.deletePage(1);
                document.addPage();
                writePDF(pdfData[i], document);
            }
        }
        return res.status(200).send({
            status: "success",
            message: `generate-pdf-successfully`,
        });

    });

generatePdf.delete("/delete-pdf/:id", async (req, res) => {
    // console.log(values);

    try {
        const dirName = path.join(__dirname, "evidence");
        // console.log(dirName)
        const evidencePath = `${dirName}/`;
        // console.log(evidencePath)
        const files = fs.readdirSync(dirName);
        const fileName = JSON.stringify(files);
        console.log(fileName)

        // const getFileName = JSON.parse(fileName);
        // getFileName = getFileName;
        if (!fs.existsSync(evidencePath)) {
            console.log("not exits");
        } else { 
            fs.unlink(evidencePath, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log("File has been Deleted");
            });
        }

        const query = deleteGeneratePDF;

        const values = [req.params.id];

        const [result] = await pool.query(query, values);
        // console.log(result);

        if (result.affectedRows === 1) {
            return res.status(200).send({
                status: "success",
                message1: "PDF-deleted-successfully",
                message2: "Database-information-deleted-successfully",
            });
        } else {
            return res.status(506).send({
                status: "failed",
                message: "Id-not-found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "failed",
            message: "internal-server-error",
        });
    }
}
);

module.exports = {
    generatePdf
}




