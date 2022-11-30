//  all import module
require("dotenv").config({
  path: `${__dirname}/.env`,
});
const { generatePdf } = require("./libs/evidence-pdf/evidence-pdf");

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.json());

app.use("/evidence-pdf", generatePdf);

const APP_PORT = process.env.APP_PORT;

app.listen(APP_PORT, () => {
  console.log(`The app is listening at http://localhost:${APP_PORT}`);
});
