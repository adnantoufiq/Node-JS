const { getXOffset } = require("../generate-pdf/offset/xoffset");
const { imageBase64 } = require("../generate-pdf/image/imageBase64");
const { allInformationData, headers } = require("./table/all-information");
const {
  deviceInformationTableData,
  deviceInformationTableHeaders,
} = require("./table/target-device-information");
const {
  workerInformationData,
  workerMarkData,
} = require("../generate-pdf/table/worker-mark-information");
const {
  personChargeData,
  personMarkData,
} = require("../generate-pdf/table/person-information");

const { getEvidenceInformationData } = require("../generate-pdf/getData/data");

const {
  yearFinalFormate,
  monthFinalFormate,
  dateFinalFormate,
} = require("../generate-pdf/dateTimeFormate/formate");

// all require module

const express = require("express");

const pdfRoute = express.Router();

const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

// PDF-generate-API

pdfRoute.post("/pdf-create", getEvidenceInformationData, (req, res) => {
  const data = req.body.evidence_information;

  try {
    const getBinaryFont = () => {
      const filePath = path.normalize(`${__dirname}/font/ipaexg.ttf`);

      const fileContent = fs.readFileSync(filePath, "binary");

      return fileContent;
    };

    // create pdf
    const writePDF = (data) => {
      const document = new jsPDF({
        orientation: "portrait",
        unit: "px",
        compress: true,

        putOnlyUsedFonts: true,
      });

      const workPlaceText = data.work_place;

      let workPlaceFormateText = workPlaceText;

      const tableTextMAX_LENGTH = 27;
      // console.log(data.erase_product);
      if (workPlaceFormateText.length > tableTextMAX_LENGTH) {
        workPlaceFormateText =
          workPlaceFormateText.slice(0, tableTextMAX_LENGTH) + "...";
      }

      data.work_place = workPlaceFormateText;

      // console.log(data.work_place);

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
      document.table(50, 266, allInformationData(data), headers, {
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
        deviceInformationTableData(data),
        deviceInformationTableHeaders,
        {
          headerBackgroundColor: "white",
          css: {
            "font-size": "0.5",
          },
        }
      );
      document.setLineWidth(0.8);

      document.table(320, 256, workerInformationData(data), workerMarkData, {
        padding: 6.5,
        printHeaders: false,
      });

      document.setLineWidth(0.8);
      document.table(320, 330, personChargeData(data), personMarkData, {
        padding: 6.5,
        printHeaders: false,
      });

      const cmtText = data.comment;
      // console.log(cmtText.length);
      let commentText = cmtText;
      const maxLength = 280;
      if (commentText.length > maxLength - 5) {
        commentText = commentText.slice(0, maxLength - 5) + "...";
      }

      const textInLine = document.splitTextToSize(commentText, 515 - 50 - 80);
      // console.log(textInLine);

      document.setFontSize(9.5);
      document.text("特記事項", 50, 537);
      document.setFontSize(11);
      document.text(textInLine, 56, 556);
      document.setLineWidth(0.8);
      document.rect(50, 540, 358, 57);

      for (let i = 0; i < data.generate_pdf; i++) {
        document.save(`evidence-pdf_${[i + 1]}.pdf`);
        pdfNumber = i + 1;
      }

      // document.save("evidence-pdf__new_add.pdf");
    };

    writePDF(data);
    res.status(200).send({
      status: "success",
      message: `${pdfNumber}-PDF-generate-successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "Failed-with-generate-pdf",
    });
  }
});

// export
module.exports = {
  pdfRoute,
};
