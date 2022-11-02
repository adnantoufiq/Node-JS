const insertSupplierQuery = `INSERT INTO TBL_SUPPLIER
(
    SUPPLIER_COMPANY_NAME,	
    SUPPLIER_CONTACT_NAME, 
    SUPPLIER_CITY, 
    SUPPLIER_COUNTRY,
    SUPPLIER_PHONE_PRIMARY, 
    SUPPLIER_PHONE_OPTIONAL,
    SUPPLIER_EMAIL
 ) 
VALUES(?,?,?,?,?,?,?)`;

const deleteSupplierQuery = `DELETE FROM TBL_SUPPLIER WHERE SUPPLIER_ID  = ?`;

//Supplier info update query

const generateSupplierUpdateQuery = (columns) => {

    let _query = 'UPDATE TBL_SUPPLIER SET ';
    const _values = [];

    if (columns.SUPPLIER_COMPANY_NAME) {
        _query += 'SUPPLIER_COMPANY_NAME = ? ';
        _values.push(columns.SUPPLIER_COMPANY_NAME);
    }
    if (columns.SUPPLIER_CONTACT_NAME) {
        if (_values.length > 0) {
            _query += ', ';
        }
        _query += 'SUPPLIER_CONTACT_NAME = ? ';
        _values.push(columns.SUPPLIER_CONTACT_NAME);
    }
    if (columns.SUPPLIER_CITY) {
        if (_values.length > 0) {
            _query += ', ';
        }
        _query += 'SUPPLIER_CITY = ? ';
        _values.push(columns.SUPPLIER_CITY);
    }
    if (columns.SUPPLIER_COUNTRY) {
        if (_values.length > 0) {
            _query += ', ';
        }
        _query += 'SUPPLIER_COUNTRY = ? ';
        _values.push(columns.SUPPLIER_COUNTRY);
    }
    if (columns.SUPPLIER_PHONE_PRIMARY) {
        if (_values.length > 0) {
            _query += ', ';
        }
        _query += 'SUPPLIER_PHONE_PRIMARY = ? ';
        _values.push(columns.SUPPLIER_PHONE_PRIMARY);
    }
    if (columns.SUPPLIER_PHONE_OPTIONAL) {
        if (_values.length > 0) {
            _query += ', ';
        }
        _query += 'SUPPLIER_PHONE_OPTIONAL = ? ';
        _values.push(columns.SUPPLIER_PHONE_OPTIONAL);
    }
    if (columns.SUPPLIER_EMAIL) {
        if (_values.length > 0) {
            _query += ', ';
        }
        _query += 'SUPPLIER_EMAIL = ? ';
        _values.push(columns.SUPPLIER_EMAIL);
    }

    if (_values.length > 0) {
        _query += ', SUPPLIER_UPDATED_AT = ? ';
        _values.push(columns.SUPPLIER_UPDATED_AT);
    }

    _query += 'WHERE SUPPLIER_ID=?';
    _values.push(columns.SUPPLIER_ID);

    return [_query, _values];
}


const getSupplierRow = `
SELECT 
    COUNT(*) AS TOTAL_ROWS 
FROM 
    TBL_SUPPLIER
`;

const getSupplier = `
SELECT 
    SUPPLIER_COMPANY_NAME,
    SUPPLIER_CONTACT_NAME,
    SUPPLIER_CITY,
    SUPPLIER_COUNTRY,
    SUPPLIER_PHONE_PRIMARY,
    SUPPLIER_PHONE_OPTIONAL 
FROM 
    TBL_SUPPLIER LIMIT ? OFFSET ?
`;





module.exports= {
    insertSupplierQuery,
    generateSupplierUpdateQuery,
    deleteSupplierQuery,
    getSupplierRow,
    getSupplier,
    
}
