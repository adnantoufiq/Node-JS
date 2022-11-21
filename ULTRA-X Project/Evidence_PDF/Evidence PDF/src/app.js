//  all import module
const { generatePdf } = require("./libs/evidence-pdf/evidence-pdf");
const path = require("path");
require("dotenv").config({
  path: path.normalize(`${__dirname}/.env`),
});

// src\.env

// console.log(`${__dirname}/.env  ==>`, process.env.DB_PORT);

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/evidence-pdf", generatePdf);
const APP_PORT = process.env.APP_PORT;

app.listen(APP_PORT, () => {
  console.log(`The app is listening at http://localhost:${APP_PORT}`);
});
