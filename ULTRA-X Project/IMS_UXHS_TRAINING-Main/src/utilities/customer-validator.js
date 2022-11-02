const isValidCustomerFirstName = (CUSTOMER_FIRST_NAME) => {

    if (!CUSTOMER_FIRST_NAME) {
        return false;
    }
    return true;
}
const isValidCustomerLastName= (CUSTOMER_LAST_NAME) => {
    if (!CUSTOMER_LAST_NAME) {
        return false;
    }
    return true;
}
const isValidCustomerCity = (CUSTOMER_CITY) => {
  
    if (!CUSTOMER_CITY) {
        return false;
    }

    return true;

}

const isValidCustomerCountry = (CUSTOMER_COUNTRY) => {
  
    if (!CUSTOMER_COUNTRY) {
        return false;
    }

    return true;

}
const isValidCustomerPhonePrimary = (CUSTOMER_PHONE_PRIMARY) => {
  
    if (!CUSTOMER_PHONE_PRIMARY) {
        return false;
    }

    return true;

}


module.exports = {
    isValidCustomerFirstName,
    isValidCustomerLastName,
    isValidCustomerCity,
    isValidCustomerCountry,
    isValidCustomerPhonePrimary,
    
}