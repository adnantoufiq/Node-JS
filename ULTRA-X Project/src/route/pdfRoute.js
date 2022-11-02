const express = require("express");

const pdfRoute = express.Router();
const { jsPDF } = require("jspdf");
const { imgData } = require("../imagebase64/imgData");
const { font } = require("./font");
const autoTable = require ('jspdf-autotable');

pdfRoute.get("/image", (req, res) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "px",
  });

  doc.setFontSize(40);
  doc.text(45, 45, "this is some text");

  doc.addImage(imgData, "JPEG", 15, 40, 180, 160);
  doc.save("new.pdf");

  res.send("success");
});

pdfRoute.get("/custom-font", (req, res) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "px",
  });

  doc.addFileToVFS("Gen Jyuu Gothic Monospace Bold-normal.ttf", font);
  doc.addFont(
    "Gen Jyuu Gothic Monospace Bold-normal.ttf",
    "Gen Jyuu Gothic Monospace Bold",
    "normal"
  );
  doc.setFont("Gen Jyuu Gothic Monospace Bold");

  doc.text("こんにちは世界", 20, 20);

  doc.save("custom_fonts.pdf");

  res.send("success");
});

pdfRoute.get("/table", (req, res) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "px",
  });

convert() {

    var col = ["Sr. No.","Details"];
    var col1 = ["Details", "Values"];
    var rows = [];
    var rows1 = [];

/* The following array of object as response from the API req  */



var itemNew = [

{ index:'1',id: 'Case Number', name : '101111111' },
{ index:'2',id: 'Patient Name', name : 'UAT DR' },
{ index:'3',id: 'Hospital Name', name: 'Dr Abcd' }

]


itemNew.forEach(element => {      
     var temp = [element.index,element.id];
     var temp1 = [element.id,element.name];
     rows.push(temp);
     rows1.push(temp1);

 });        

     doc.autoTable(col, rows, { startY: 10 });

     doc.autoTable(col1, rows1, { startY: 60 });
     doc.save('Test.pdf');
   }

  res.send("success");
});

module.exports = {
  pdfRoute,
};
