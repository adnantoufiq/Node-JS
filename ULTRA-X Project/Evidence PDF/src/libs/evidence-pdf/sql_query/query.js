const insertTableQuery = `
INSERT INTO pdf_info(name, path)
VALUES(?, ?)`;

const deleteGeneratePDF = `
DELETE 
FROM 
    pdf_info 
WHERE 
    ID = ?`;

module.exports = {
  insertTableQuery,
  deleteGeneratePDF,
};
