const isValidOrderId = (ORDER_ID) => {
  if (!ORDER_ID) {
    return false;
  }
  return true;
};
const isValidProductId = (PRODUCT_ID) => {
  if (!PRODUCT_ID) {
    return false;
  }
  return true;
};
const isValidOrderUnitePrice = (ORDER_UNIT_PRICE) => {
  if (!ORDER_UNIT_PRICE) {
    return false;
  }

  return true;
};

const isValidOrderQuantity = (ORDER_QUANTITY) => {
  if (!ORDER_QUANTITY) {
    return false;
  }

  return true;
};

module.exports = {
  isValidOrderId,
  isValidProductId,
  isValidOrderUnitePrice,
  isValidOrderQuantity,
};
