# IMS (Inventory Management System)

## Author Information

```js


## Installation procedure

Navigate to the project directory and then execute the below command

> `npm i`

_Pre-requisite: You have to have the `Node` and `npm` installed on your system_


## Running the application

Navigate to the project directory and then execute the below command

Run for development version

> `npm run dev`

Otherwise,

> `npm start`

## Route list of the application

### **Auth Route** :
|Method  |URL                                   |Description               |
|------|------------------------------------|------------------------|
|POST    | http://localhost:4560/auth/signup     |This url is used for create user |
|POST    | http://localhost:4560/auth/login      |This url is used for login user  |
|PUT     | http://localhost:4560/auth/update/:id |This url is used for update user|
|GET     | http://localhost:4560/auth/get-user   |This url is used for get all user|

### **Customer Route** :
|Method  |URL                                   |Description               |
|------|------------------------------------|------------------------|
|POST    | http://localhost:4560/customer/add    |This url is used for create customer |
|DELETE  | http://localhost:4560/customer/delete/:id|This url is used for delete customer  |
|PUT     | http://localhost:4560/customer/update/:id|This url is used for update customer|
|GET     | http://localhost:4560/customer/get-customer   | This url is used for get all customer|
|GET|http://localhost:4560/customer/customer-order-information/:id|This url is used for get order information|

### **Supplier Route** :
|Method  |URL                                   |Description               |
|------|------------------------------------|------------------------|
|POST    | http://localhost:4560/supplier/add    |This url is used for create supplier |
|DELETE  | http://localhost:4560/supplier/delete/:id|This url is used for delete supplier  |
|PUT     | http://localhost:4560/supplier/update/:id|This url is used for update supplier|
|GET     | http://localhost:4560/supplier/get-supplier   | This url is used for get all supplier|

### **Product Route** :
|Method  |URL                                   |Description               |
|------|------------------------------------|------------------------|
|POST    | http://localhost:4560/product/add    |This url is used for create product |
|DELETE  | http://localhost:4560/product/delete/:id|This url is used for delete product  |
|PUT     | http://localhost:4560/product/update/:id|This url is used for update product|
|GET     | http://localhost:4560/product/get-product   | This url is used for get all product|
|GET|http://localhost:4560/product/product-Id-Quantity-information/:id|This url is used for get product quantity information by id|

### **Order Route** :
|Method  |URL                                   |Description               |
|------|------------------------------------|------------------------|
|POST    | http://localhost:4560/order/add    |This url is used for create order order|
|DELETE  | http://localhost:4560/order/delete/:id|This url is used for delete order  |
|PUT     | http://localhost:4560/order/update/:id|This url is used for update order|
|GET     | http://localhost:4560/order/get-order   | This url is used for get all order|
|GET|http://localhost:4560/order/order-id-info|This url is used for Order information by id|

### **Order Item Route** :
|Method  |URL                                   |Description               |
|------|------------------------------------|------------------------|
|POST    | http://localhost:4560/orderItem/add    |This url is used for create order item |
|DELETE  | http://localhost:4560/orderItem/delete/:id|This url is used for delete order item  |
|PUT     | http://localhost:4560/orderItem/update/:id|This url is used for update order item|
|GET     | http://localhost:4560/orderItem/get-orderitem   | This url is used for get all order item|
|GET|http://localhost:4560/orderItem/orderItem-name-Quantity-information|This url is used for order item information|
