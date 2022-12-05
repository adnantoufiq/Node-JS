const XLSX = require("xlsx");
const express = require("express");


const convertJsonToExcel =  (req, res) => {
  const xlsxData =  req.body.xlsxData;

  const sheet = XLSX.utils.json_to_sheet(xlsxData);
  const book = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(book, sheet, "students");

  //buffer genereate

  XLSX.write(book, { bookType: "xlsx", type: "buffer" });

  //binary generate
  XLSX.write(book, { bookType: "xlsx", type: "binary" });

  // dowload file

  XLSX.writeFile(book, "studentsData.xlsx");
};

convertJsonToExcel();

module.exports = {
  convertJsonToExcel,
};
