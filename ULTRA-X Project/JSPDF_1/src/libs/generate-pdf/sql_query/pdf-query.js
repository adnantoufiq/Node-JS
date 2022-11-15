const insertTableQuery = `
INSERT INTO tbl_information(
   NAME, PATH
)
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
