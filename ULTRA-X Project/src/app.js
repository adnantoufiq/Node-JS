require("dotenv").config({
    path: `${__dirname}/.env`
});


const {pdfRoute} = require("./route/pdfRoute")


const express = require("express");
const app = express();



// Common Middlewares
app.use(express.json());


//  pdf APIs
app.use("/pdf", pdfRoute);



// app running port
const APP_PORT = process.env.APP_PORT;
app.listen(APP_PORT, () => {
    console.log(`The app is listening at http://localhost:${APP_PORT}`);
});
