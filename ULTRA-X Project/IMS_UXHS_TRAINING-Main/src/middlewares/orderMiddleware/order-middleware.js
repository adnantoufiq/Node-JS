const {
  isValidOrderAmount,
  isValidOrderCurrentStatus,
} = require("../../utilities/order-validator");

const parseOrderBodyData = (req, res, next) => {

  const order = {

    CUSTOMER_ID: req.body.CUSTOMER_ID,
    ORDER_AMOUNT: req.body.ORDER_AMOUNT,
    ORDER_CURRENT_STATUS: req.body.ORDER_CURRENT_STATUS,
  };




  const errors = []

  if (!isValidOrderAmount(order.ORDER_AMOUNT)) {
    errors.push("ORDER_AMOUNT-is-not-valid");

  }
  if (!isValidOrderCurrentStatus(order.ORDER_CURRENT_STATUS)) {
    errors.push("ORDER_CURRENT_STATUS-is-not-valid");

  }

  if (errors.length >= 1) {
    return res.status(406).send({
      status: "failed",
      message: "invalid-data",
      errors,
    });
  }

  req.body.order = order;

  next();
};

module.exports = {
  parseOrderBodyData,
};
