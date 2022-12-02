const isValidCustomerId = (CUSTOMER_ID) => {
    if (!CUSTOMER_ID) {
      return false;
    }
    return true;
  };
  const isValidOrderAmount = (ORDER_AMOUNT) => {
    if (!ORDER_AMOUNT) {
      return false;
    }
  
    return true;
  };
  
  const isValidOrderCurrentStatus= (ORDER_CURRENT_STATUS) => {
    if (!ORDER_CURRENT_STATUS) {
      return false;
    }
  
    return true;
  };
  
  module.exports = {
    isValidCustomerId,
    isValidOrderAmount,
    isValidOrderCurrentStatus,
  };
  