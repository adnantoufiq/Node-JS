//  all import module
const { generateXLSX } = require("./libs/xlsx-file/generate-xlsx-file");

const express = require("express");
const app = express();

//app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.json());


app.use("/evidence-xlsx", generateXLSX);


app.listen(4560, () => {
    console.log(`The app is listening at http://localhost:4560`);
});