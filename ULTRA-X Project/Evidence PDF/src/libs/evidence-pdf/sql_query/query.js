const insertTableQuery = `
INSERT INTO  tbl_information(FILE_NAME, FILE_PATH)
VALUES(?, ?)`;

const deleteGeneratePDF = `
DELETE 
FROM 
tbl_information 
WHERE 
    ID = ?`;

const pdfName = `
SELECT
    FILE_NAME
FROM
    tbl_information
WHERE
    ID = ?`;

const pdfId = `
    SELECT
        ID
    FROM
        tbl_information
    WHERE
        ID = ?`;

module.exports = {
  insertTableQuery,
  deleteGeneratePDF,
  pdfName,
  pdfId,
};
