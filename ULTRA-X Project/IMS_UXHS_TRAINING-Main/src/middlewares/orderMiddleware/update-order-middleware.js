
const dateFNS = require("date-fns");
/**
 * This middleware is for parse Order body data
 */
const getOrderBodyData = async (req, res, next) => {
    const ORDER_ID = req.params.id;
    const orderData = {
        ORDER_ID,
        ORDER_AMOUNT: req.body.ORDER_AMOUNT,
        ORDER_CURRENT_STATUS: req.body.ORDER_CURRENT_STATUS,
        ORDER_UPDATED_AT: dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    req.body.orderData = orderData;
    next();
};

module.exports = {
    getOrderBodyData,
};
