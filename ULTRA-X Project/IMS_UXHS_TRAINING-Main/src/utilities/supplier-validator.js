const isValidSupplierCompanyName = (SUPPLIER_COMPANY_NAME) => {

    if (!SUPPLIER_COMPANY_NAME) {
        return false;
    }
    return true;
}
const isValidSupplierContactName= (SUPPLIER_CONTACT_NAME) => {
    if (!SUPPLIER_CONTACT_NAME) {
        return false;
    }
    return true;
}
const isValidSupplierCity = (SUPPLIER_CITY) => {
  
    if (!SUPPLIER_CITY) {
        return false;
    }

    return true;

}

const isValidSupplierCountry = (SUPPLIER_COUNTRY) => {
  
    if (!SUPPLIER_COUNTRY) {
        return false;
    }

    return true;

}
const isValidSupplierPhonePrimary = (SUPPLIER_PHONE_PRIMARY) => {
  
    if (!SUPPLIER_PHONE_PRIMARY) {
        return false;
    }

    return true;

}
const isValidSupplierEmail = (SUPPLIER_EMAIL) => {
  
    if (!SUPPLIER_EMAIL) {
        return false;
    }

    return true;

}

module.exports = {
    isValidSupplierCompanyName,
    isValidSupplierContactName,
    isValidSupplierCity,
    isValidSupplierCountry,
    isValidSupplierPhonePrimary,
    isValidSupplierEmail
}