
const { jsPDF } = require("jspdf"); // will automatically load the node version


// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");