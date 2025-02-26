const express = require('express');
cartRouter = express.Router();
const { getCartDetails, addCartDetails ,editCartDetails,deleteCartDetails,viewCartDetails} = require('./controller/cartController');
// Route to render the cart page
cartRouter.get('/product/cart', getCartDetails);

// Route to handle adding a product to the cart
cartRouter.post('/product/cart', addCartDetails);

// Route to handle editing a product in the cart
cartRouter.get('/product/edit/:productId',editCartDetails);

// Route to handle editing a product in the cart
cartRouter.post('/product/edit',editCartDetails);

// Route to handle deleting a product from the cart
cartRouter.get('/product/delete/:productId',deleteCartDetails);

// Route to handle deleting a product from the cart
cartRouter.get('/viewcart', viewCartDetails);




exports.cartRouter = cartRouter;