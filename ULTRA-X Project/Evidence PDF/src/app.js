//  all import module
const { generatePdf } = require("./libs/evidence-pdf/evidence-pdf");

const express = require("express");
const app = express();
const { path } = require("path");

//app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());

app.use("/evidence-pdf", generatePdf);

app.listen(4560, () => {
  console.log(`The app is listening at http://localhost:4560`);
});
