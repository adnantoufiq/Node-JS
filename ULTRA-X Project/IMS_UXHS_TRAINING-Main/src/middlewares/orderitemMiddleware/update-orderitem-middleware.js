const dateFNS = require("date-fns");
/**
 * This middleware is for parse Order Item body data
 */
const getOrderitemBodyData = async (req, res, next) => {
    const ORDER_ITEM_ID = req.params.id;
    const orderitemData = {
        ORDER_ITEM_ID,
        ORDER_UNIT_PRICE: req.body.ORDER_UNIT_PRICE,
        ORDER_QUANTITY: req.body.ORDER_QUANTITY,
        ORDER_ITEM_UPDATED_AT: dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    req.body.orderitemData = orderitemData;
    next();
};

module.exports = {
    getOrderitemBodyData,
};
