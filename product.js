const express = require('express');
const { getAddProduct,postAddProduct,getProductDetails,editProductDetails,deleteProductDetails } = require('./controller/productController');
const productRouter = express.Router();

// Route to render the add product page
productRouter.get('/product/add', getAddProduct);

// Route to handle adding a product
productRouter.post('/product/add', postAddProduct);

// Route to render the details product page
productRouter.get('/product/details/:productId', getProductDetails);

// Route to handle editing a product in the cart
productRouter.get('/viewPageProduct/edit/:productId',editProductDetails);

// Route to handle editing a product in the cart
productRouter.post('/viewPageProduct/edit',editProductDetails);

// Route to handle deleting a product from the cart
productRouter.get('/viewPageProduct/delete/:productId',deleteProductDetails);




module.exports = {
    productRouter // Export the router for use in app.js
};