// Description: This file contains the routes for the home page.
// Route to get the home page
const express = require('express');
const app = express(); // Properly declare 'app'
const products = require('./models/product_modal');
const homeRoutes = express.Router();
homeRoutes.get('/', async (req, res) => {
    let productData = await products.showAllProducts();
   let viewData = {pageTitle: 'Home', products: productData};
    res.status(200).render('viewProduct', viewData);
});

exports.homeRoutes = homeRoutes; // Export 'app' for testing