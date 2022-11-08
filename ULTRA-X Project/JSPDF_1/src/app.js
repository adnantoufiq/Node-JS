require("dotenv").config({
  path: `${__dirname}/.env`,
});

//  all import module

const express = require("express");
const app = express();

const { pdfRoute } = require("./libs/generate-pdf/pdf");
// Common Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  orderItem API
app.use("/pdf", pdfRoute);

const APP_PORT = process.env.APP_PORT;
app.listen(APP_PORT, () => {
  console.log(`The app is listening at http://localhost:${APP_PORT}`);
});
