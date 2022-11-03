const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");
const { getXOffset } = require("./offset/xoffset");
const { imageBase64 } = require("./image/imageBase64");
const { allInformationData, headers } = require("./table/work-information");
const {
  deviceInformationTableData,
  deviceInformationTableHeaders,
} = require("./table/target-device");
const {
  workerInformationData,
  workerMarkData,
} = require("./table/worker-mark-information");
const {
  personChargeData,
  personMarkData,
} = require("./table/person-information");

const getBinaryFont = () => {
  const filePath = path.normalize(`${__dirname}/font/ipaexg.ttf`);

  const fileContent = fs.readFileSync(filePath, "binary");

  return fileContent;
};

const dateTime = new Date();
const year = dateTime.getFullYear();
const date = dateTime.getDate();
const month = dateTime.getMonth() + 1;
const hour = dateTime.getHours();
const mnt = dateTime.getMinutes();
const sec = dateTime.getSeconds();

const yearFinalFormate = year < 10 ? "0" + year : year;
const monthFinalFormate = month < 10 ? "0" + month : month;
const dateFinalFormate = date < 10 ? "0" + date : date;

const hourFinalFormate = hour < 10 ? "0" + hour : hour;
const mntFinalFormate = mnt < 10 ? "0" + mnt : mnt;
const secFinalFormate = sec < 10 ? "0" + sec : sec;

const getPDF = () => {
  const pdfData = {
    erseProduct:
      "FlashErase LEGACY FlashErase LEGACY FlashErase LEGACY FlashErase LEGACY",
    location: "東京都千代⽥区岩本町3-9-17 スリーセブンビル8F",
    eraseMethod: "0000000000000000000",
    yearMonthDateHourMinuteSec: `${yearFinalFormate}-${monthFinalFormate}-${dateFinalFormate} ${hourFinalFormate}:${mntFinalFormate}:${secFinalFormate}`,
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  };
  return pdfData;
};

const writePDF = (pdfGen) => {
  const document = new jsPDF({
    orientation: "portrait",
    unit: "px",
    compress: true,

    putOnlyUsedFonts: true,
  });

  const eraseProductText = pdfGen.erseProduct;

  const eraseProductFormateText = eraseProductText;

  const finalFormate = document.splitTextToSize(eraseProductFormateText, 350);

  console.log(document.getTextDimensions(finalFormate));

  pdfGen.erseProduct = finalFormate[0] + "...";
  console.log(pdfGen.erseProduct);

  const japaneseFont = getBinaryFont();
  document.addFileToVFS("ipaexg.ttf", japaneseFont);
  document.addFont("ipaexg.ttf", "ipaexg", "normal");
  document.addFont("ipaexg.ttf", "ipaexg", "bold");

  document.setFont("ipaexg");

  document.setFontSize(9.5);

  document.text(
    `作成⽇:               ${yearFinalFormate} 年 ${monthFinalFormate} ⽉ ${dateFinalFormate} ⽇ `,
    285,
    60,
    null,
    null
  );
  document.addImage(imageBase64, "JPEG", 362, 65, 44, 32); //(R, D,)
  document.setFontSize(14);
  document.text("御中", 48, 120);
  document.setFontSize(9.5);
  document.text("〒101-0032", 240, 145);
  document.text("東京都千代⽥区岩本町3-9-17 スリーセブンビル8F", 240, 157);
  document.text("株式会社ウルトラエックス", 318, 167);
  document.text("営業部担当 :", 363, 177);
  document.text("Tel:03-5823-5620 Fax:03-5823-5667", 276, 189);

  const text = "データ消去証明書";
  const xOffset = getXOffset(text, document);
  document.setFontSize(13);
  document.text(text, xOffset, 218);
  document.setFontSize(9);
  const wrapText =
    "この度、貴社よりご依頼いただきました電⼦記録媒体のソフトウェア消去を、下記の内容で ⾏いましたことを証明致します。";
  const textalign = document.splitTextToSize(wrapText, 470 - 60 - 115);
  document.text(textalign, 60, 244);

  document.setLineWidth(0.8);
  document.setFontSize(11);
  document.table(50, 266, allInformationData(pdfGen), headers, {
    padding: 2.3,
    printHeaders: false,
    css: {
      "font-size": "0.53",
    },
  });

  document.setFontSize(9.5);
  document.text("対象機器は以下の通りです。", 50, 395);

  document.table(
    50,
    400,
    deviceInformationTableData(8),
    deviceInformationTableHeaders,
    {
      headerBackgroundColor: "white",
      css: {
        "font-size": "0.5",
      },
    }
  );
  document.setLineWidth(0.8);

  document.table(320, 256, workerInformationData(), workerMarkData, {
    padding: 6.5,
    printHeaders: false,
  });

  document.setLineWidth(0.8);
  document.table(320, 330, personChargeData(), personMarkData, {
    padding: 6.5,
    printHeaders: false,
  });

  const cmtText = pdfGen.comment;
  // console.log(cmtText.length);
  const maxLength = 315;
  var commentText = cmtText;
  if (commentText.length > maxLength) {
    commentText = commentText.slice(0, maxLength) + ".....";
  }
  // const textInLine = document.splitTextToSize(commentText, 500);

  const textInLine = document.splitTextToSize(commentText, 520 - 50 - 90);
  // console.log(textInLine);

  document.setFontSize(9.5);
  document.text("特記事項", 50, 537);
  document.setFontSize(11);
  document.text(textInLine, 56, 556);
  document.setLineWidth(0.8);
  document.rect(50, 540, 358, 57);

  document.save("evidence-pdf__new_add.pdf");
};

const pdfGen = getPDF();
// console.log(pdfGen);
writePDF(pdfGen);
