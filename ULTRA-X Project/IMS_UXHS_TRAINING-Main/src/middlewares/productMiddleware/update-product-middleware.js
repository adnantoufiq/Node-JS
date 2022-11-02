const dateFNS = require("date-fns");
/**
 * This middleware is for parse Product body data
 */
const getProductBodyData = async (req, res, next) => {
    const PRODUCT_ID = req.params.id;
    const productData = {
        PRODUCT_ID,
        PRODUCT_NAME: req.body.PRODUCT_NAME,
        PRODUCT_UNIT_PRICE: req.body.PRODUCT_UNIT_PRICE,
        PRODUCT_PACKAGE: req.body.PRODUCT_PACKAGE,
        PRODUCT_IMAGE: req.body.PRODUCT_IMAGE,
        PRODUCT_IS_DISCONTINUED: req.body.PRODUCT_IS_DISCONTINUED,
        PRODUCT_UPDATED_AT: dateFNS.format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    req.body.productData = productData;
    next();
};

module.exports = {
    getProductBodyData,
};
