const isValidSupplierId = (SUPPLIER_ID) => {

    if (!SUPPLIER_ID) {
        return false;
    }
    return true;
}


const isValidProductName = (PRODUCT_NAME) => {

    if (!PRODUCT_NAME) {
        return false;
    }
    return true;
}
const isValidProductPrice= (PRODUCT_UNIT_PRICE) => {
    if (!PRODUCT_UNIT_PRICE) {
        return false;
    }
    return true;
}
const isValidProductPackage = (PRODUCT_PACKAGE	) => {
  
    if (!PRODUCT_PACKAGE	) {
        return false;
    }

    return true;

}

const isValidProductImage = (PRODUCT_IMAGE) => {
  
    if (!PRODUCT_IMAGE) {
        return false;
    }

    return true;

}


module.exports = {
    isValidSupplierId,
    isValidProductName,
    isValidProductPrice,
    isValidProductPackage,
    isValidProductImage,
    
}