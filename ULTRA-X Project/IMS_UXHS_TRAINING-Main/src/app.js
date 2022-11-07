require("dotenv").config({
    path: `${__dirname}/.env`
});


//  all import module
const { authRoute } = require("./routes/auth/auth-route");
const { supplierRoute } = require("./routes/supplier/supplier-route");
const { customerRoute } = require("./routes/customer/customer-route");
const { productRoute }    = require("./routes/product/product-route")
const { orderRoute }    = require("./routes/order/order-route")
const { orderItemRoute }    = require("./routes/orderItem/orderItem-route")

const cors = require("cors");
const express = require("express");
const app = express();



// Common Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//  auth APIs
app.use("/auth", authRoute);

// complete customer API
app.use("/customer", customerRoute);

// complete supplier API
app.use("/supplier", supplierRoute);

//  product API
app.use("/product", productRoute);

//  order API
app.use("/order", orderRoute);

//  orderItem API
app.use("/orderItem", orderItemRoute);


const APP_PORT = process.env.APP_PORT;
app.listen(APP_PORT, () => {
  console.log(`The app is listening at http://localhost:${APP_PORT}`);
});
