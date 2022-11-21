const insertTableQuery = `
INSERT INTO pdf_table(name, path)
VALUES(?, ?)`;

const deleteGeneratePDF = `
DELETE 
FROM 
    tbl_information 
WHERE 
    ID = ?`;

module.exports = {
  insertTableQuery,
  deleteGeneratePDF,
};
