const express = require("express");
const generatePdf = express.Router();

const XLSX = require("xlsx");

const { pool } = require("../db/pool");
const fs = require("fs");
const path = require("path");

const { getTableInfo } = require("../sql-query/query");

// xlsx file generate API
/**
 * Represents a book.
 * @Author 
 */
generatePdf.get("/generate-xlsx-file", async (req, res) => {
  try {
    const [result] = await pool.query(getTableInfo);
    const writeSheet = XLSX.utils.json_to_sheet(result);
    const writeBook = XLSX.utils.book_new();

    const dirName = path.join(__dirname, "../evidence/");
    XLSX.utils.book_append_sheet(writeBook, writeSheet, "Result");
    //buffer generate
    XLSX.write(writeBook, { bookType: "xlsx", type: "buffer" });
    //binary generate
    XLSX.write(writeBook, { bookType: "xlsx", type: "binary" });
    // download file
    XLSX.writeFile(writeBook, `${dirName}/evidence-pdf-info.xlsx`);
    const file = `${dirName}/evidence-pdf-info.xlsx`;
    res.download(file);
  } catch (error) {
    return res.status(500).send({
      error,
      status: "failed",
      message: "internal-server-error",
    });
  }
});

module.exports = {
  generatePdf,
};
