const express = require("express");

const pdfRoute = express.Router();
const { jsPDF } = require("jspdf"); // will automatically load the node version

// const {pdfGenerator} = require("../middlewares/pdf-gen-middleware");
const doc = new jsPDF();

pdfRoute.get("/pdf-gen", (req, res) => {
doc.text("Do you like that?", 20, 20);
doc.addPage("a4", "2");
doc.save("a4.pdf");
  

  res.send("success");
}); 

module.exports = {
  pdfRoute,
};
