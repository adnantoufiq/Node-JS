// import module

const { fileUploads } = require("./libs/main/file-upload");

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", fileUploads);

app.listen(4560, () => {
  console.log(`The app is listening at http://localhost:4560`);
});
