const insertTableQuery = `
INSERT INTO  tbl_evidence_information(UXHS_DETAIL_TABLE_ID ,FILE_INFORMATION,FILE_NAME, FILE_PATH)
VALUES(?,?,?, ?)`;

const deleteGeneratePDF = `
    DELETE 
    FROM 
        tbl_evidence_information 
    WHERE 
        ID = ?`;

const pdfName = `
SELECT
    FILE_NAME
FROM
    tbl_evidence_information
WHERE
    ID = ?`;

const pdfId = `
    SELECT
        ID
    FROM
        tbl_evidence_information
    WHERE
        ID = ?`;

const tblId = `
    SELECT
        UXHS_DETAIL_TABLE_ID
    FROM
        tbl_evidence_information
    WHERE
        ID = ? `;

module.exports = {
  insertTableQuery,
  deleteGeneratePDF,
  pdfName,
  pdfId,
  tblId,
};
