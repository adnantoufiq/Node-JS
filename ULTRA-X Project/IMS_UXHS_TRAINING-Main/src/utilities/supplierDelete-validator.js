const isValidSupplierId = (SUPPLIER_ID) => {

    if (!SUPPLIER_ID) {
        return false;
    }
    return true;
}

module.exports={
    isValidSupplierId
}