const getTableInfo = `SELECT * 
    FROM 
tbl_evidence_information`;


const getSpecificEvidenceInfo = `
SELECT * 
FROM 
    tbl_evidence_information
WHERE
    ID = ?


`

module.exports={
    getTableInfo,
    getSpecificEvidenceInfo,
};