const insertTableQuery = `
INSERT INTO tbl_evidence_information(
  UXHS_DETAIL_TABLE_ID,
  FILE_INFORMATION,
  FILE_NAME,
  FILE_PATH
)
VALUES(?, ?, ?, ?)


`;

const updateQuery = (columns) => {
  let _query = "UPDATE tbl_evidence_information SET ";
  const _values = [];

  if (columns.uxshTableValue) {
    _query += "UXHS_DETAIL_TABLE_ID = ? ";
    _values.push(columns.uxshTableValue);
  }
  if (columns.strFileInfo) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "FILE_INFORMATION = ? ";
    _values.push(columns.strFileInfo);
  }
  if (columns.fileName) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "FILE_NAME = ? ";
    _values.push(columns.fileName);
  }
  if (columns.getFilePath) {
    if (_values.length > 0) {
      _query += ", ";
    }
    _query += "FILE_PATH = ? ";
    _values.push(columns.getFilePath);
  }

  if (_values.length > 0) {
    _query += ", UPDATED_AT = ? ";
    _values.push(columns.time);
  }

  _query += "WHERE ID=?";
  _values.push(columns.id);

  return [_query, _values];
};

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
    ID = ?`;

const gettableId = `
SELECT
    UXHS_DETAIL_TABLE_ID
FROM
    tbl_evidence_information
WHERE
    ID = ?
`;

const getTableInfo = `
SELECT
    *
FROM
    tbl_evidence_information`;

const getSpecificEvidenceInfo = `
SELECT
    *
FROM
    tbl_evidence_information
WHERE
    ID =?


`;

module.exports = {
  insertTableQuery,
  deleteGeneratePDF,
  pdfName,
  pdfId,
  gettableId,
  updateQuery,
  getTableInfo,
  getSpecificEvidenceInfo,
};
