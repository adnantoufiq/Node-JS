const {   
  isValidOrderUnitePrice,
  isValidOrderQuantity } = require("../../utilities/orderItem-validator")
  
  
  
  

const parseOrderItemBodyData = (req, res, next) => {

    const orderItem = {
      
      ORDER_ID : req.body.ORDER_ID ,
      PRODUCT_ID  : req.body.PRODUCT_ID,
      ORDER_UNIT_PRICE: req.body.ORDER_UNIT_PRICE,
      ORDER_QUANTITY: req.body.ORDER_QUANTITY,
      
  
    }
  
    const errors = []

    if (!isValidOrderUnitePrice(orderItem.ORDER_UNIT_PRICE)) {
     errors.push("ORDER_UNIT_PRICE-is-not-valid");
 
   }  
   if (!isValidOrderQuantity(orderItem.ORDER_QUANTITY)) {
     errors.push("ORDER_QUANTITY-is-not-valid");
 
   }  
  
   
   if (errors.length >= 1) {
     return res.status(406).send({
       status: "failed",
       message: "invalid-data",
       errors,
     });
   }
 

   req.body.orderItem = orderItem

    next();
  }



module.exports={
  parseOrderItemBodyData
}


