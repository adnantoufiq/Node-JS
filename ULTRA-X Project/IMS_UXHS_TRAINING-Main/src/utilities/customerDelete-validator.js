const isValidCustomerId = (CUSTOMER_ID) => {

    if (!CUSTOMER_ID) {
        return false;
    }
    return true;
}

module.exports={
    isValidCustomerId
}