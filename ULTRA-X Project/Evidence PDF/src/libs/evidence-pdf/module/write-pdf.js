/**
 * Generate pdf using jspdf instance based on the pdfData
 * @param {Object} pdfData The pdf data to generate pdf
 * @param {jsPDF} document The document that holds jspdf instance
 */
const { getXOffset } = require("../get-offset/get-offset");
const { jsPDF } = require("jspdf");
const path = require("path");
const { pool } = require("../db/pool");
const { insertTableQuery } = require("../sql_query/query");
const {
  yearFinalFormate,
  monthFinalFormate,
  dateFinalFormate,
} = require("../dateTimeFormate/formate");
let { generateEraseData, eraseTableHeaders } = require("../table/erase-info");

let { generateWorkerData, workerHeaders } = require("../table/worker-table");
let {
  generateResponsibleData,
  responsibleHeaders,
} = require("../table/responsible-table");
let {
  generateDataTargetDevice,
  targetTableHeaders,
} = require("../table/target-device");
const { logo } = require("../images/logo");
const fs = require("fs");

const writePDF = async (pdfData, document) => {
  // let pdfData = req.body.pdfData;
  // const document = new jsPDF({
  //   orientation: "portrait",
  //   unit: "px",
  //   compress: true,
  //   putOnlyUsedFonts: true,
  // });

  const leftMargin = 50;

  document.setFontSize(9);
  const date = `作成⽇：     ${yearFinalFormate} 年 ${monthFinalFormate} ⽉ ${dateFinalFormate} ⽇`;
  document
    .text(date, 300, 60)
    .addImage(logo, 363, 70, 40, 30, "FAST") // add logo

    // set line width and font size
    .setLineWidth(0.5)
    .setFontSize(12)
    .text("御中", leftMargin, 110)
    .setFontSize(9)
    .text("〒101-0032", 246, 137)
    .text("東京都千代⽥区岩本町3-9-17 スリーセブンビル8F", 247, 148)
    .text("株式会社ウルトラエックス", 320, 159)
    .text("営業部担当 :", 362, 170)
    .text("Tel:03-5823-5620 Fax:03-5823-5667", 278, 181);

  // centralized main text using the function
  const text1 = "データ消去証明書";
  const xOffset = getXOffset(text1, document);
  document.setFontSize(12).text(text1, xOffset, 205).setFontSize(9);
  const longText =
    "この度、貴社よりご依頼いただきました電⼦記録媒体のソフトウェア消去を、下記の内容で⾏いましたことを証明致します。";

  // custom text wrapper
  const textLine = document.splitTextToSize(longText, 455 - leftMargin - 110);
  document.text(textLine, 60, 228);

  // Add erase-info table
  if (pdfData.company_address.length > 30) {
    pdfData.company_address = pdfData.company_address.slice(0, 27) + "...";
    document.table(
      leftMargin,
      250,
      generateEraseData(pdfData),
      eraseTableHeaders,
      {
        printHeaders: false,
        css: {
          "font-size": 0.5,
        },
      }
    );
  } else {
    document.table(
      leftMargin,
      250,
      generateEraseData(pdfData),
      eraseTableHeaders,
      {
        printHeaders: false,
        css: {
          "font-size": 0.5,
        },
      }
    );
  }

  // add worker table
  document.table(325, 240, generateWorkerData(), workerHeaders, {
    headerBackgroundColor: "white",
    padding: 5,
  });

  //add responsible table
  document.table(325, 320, generateResponsibleData(1), responsibleHeaders, {
    headerBackgroundColor: "white",
    padding: 5,
  });

  document.setFontSize(9).text("対象機器は以下の通りです。", leftMargin, 378);

  //add target device table
  document.table(
    leftMargin,
    381,
    generateDataTargetDevice(pdfData),
    targetTableHeaders,
    {
      headerBackgroundColor: "white",
      css: {
        "font-size": 0.6,
      },
    }
  );

  document.text("特記事項", leftMargin, 532);

  //custom comment box
  document.rect(leftMargin, 535, 350, 50);

  // Set comment data
  let commentText = pdfData.comment;
  if (commentText.length > 245) {
    commentText = commentText.slice(0, 245) + "...";
  }
  const textInLine = document.splitTextToSize(commentText, 455 - 55 - 63);
  document.text(textInLine, 60, 550);

  // save pdf
  const dirName = path.join(__dirname, "../evidence/");

  document.save(`${dirName}/Evidence-PDF _ ${pdfData.processing_number}.pdf`);
  const fileName = `Evidence-PDF _ ${pdfData.processing_number}.pdf`;

  const getFilePath = dirName + fileName;
  const normalizePath = path.normalize(getFilePath);
  const strNormalizePath = JSON.stringify(normalizePath);
  const parseNormalizePath = JSON.parse(strNormalizePath);
  const { size } = fs.statSync(parseNormalizePath);
  const strSize = JSON.stringify(size);

  const { base, dir, ext, name } = path.parse(parseNormalizePath);

  const strDir = JSON.stringify(dir);
  const strBase = JSON.stringify(base);
  const strExt = JSON.stringify(ext);
  const strName = JSON.stringify(name);
  const fileInfo = strDir + strBase + strExt + strName + strSize;
  const stringAllImportantInfo = JSON.stringify(fileInfo);

  // console.log({stringAllImportantInfo})

  const tableValue = pdfData.UXHS_DETAIL_TABLE_ID;

  const values = [tableValue, stringAllImportantInfo, fileName, getFilePath];
  const [result] = await pool.query(insertTableQuery, values);
};

module.exports = {
  writePDF,
};
