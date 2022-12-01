const insertTableQuery =
    `INSERT INTO tbl_evidence_information(
        UXHS_DETAIL_TABLE_ID,
        FILE_INFORMATION,
        FILE_NAME,
        FILE_PATH
    )
    VALUES(?, ?, ?, ?)`;

const deleteGeneratePDF = `
DELETE 
FROM 
    tbl_evidence_information 
WHERE 
    ID = ?`;

const pdfName = `
SELECT
    file_name
FROM
tbl_evidence_information
WHERE
    ID = ?`;
const pdfId = `
    SELECT
        id
    FROM
    tbl_evidence_information
    WHERE
        ID = ?`

const getFileInfo = `
SELECT 
    FILE_INFORMATION
FROM 
    tbl_evidence_information
WHERE
    ID = ?
`;
const gettableId = `
SELECT 
    UXHS_DETAIL_TABLE_ID
FROM 
    tbl_evidence_information
WHERE
    ID = ?
`;

module.exports = {
    insertTableQuery,
    deleteGeneratePDF,
    pdfName,
    pdfId,
    getFileInfo,
    gettableId
};
