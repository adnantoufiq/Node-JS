const express = require('express');
const XLSX = require("xlsx");
const { getTableInfo } = require('../sql_query/query')
const { pool } = require('../db/pool')

const convertJsonToExcel = (result) => {

    const [result] = pool.query(getTableInfo);
    const sheet = XLSX.utils.json_to_sheet(result);
    const book = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(book, sheet, "students");

  //buffer genereate

  XLSX.write(book, { bookType: "xlsx", type: "buffer" });

  //binary generate
  XLSX.write(book, { bookType: "xlsx", type: "binary" });

  // dowload file

  XLSX.writeFile(book, "studentsData.xlsx");
};

convertJsonToExcel(result);

module.exports = {
  convertJsonToExcel,
};
