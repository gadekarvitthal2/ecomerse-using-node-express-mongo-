const e = require('express');
const product = require('../models/product_modal');
const saveProduct = require('../models/product_modal').addProduct;
const productModel = require('../models/product_modal');
const cartModel = require('../models/cart_models');
exports.getAddProduct = (req, res) => {
    res.status(200).render('addProduct', { pageTitle: 'Add Product' });
}

exports.postAddProduct = async (req, res) => {
    let productData = {
        id:Date.now(),
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description
    }
    await saveProduct(productData);
    let products = await productModel.showAllProducts();
    let viewData = { pageTitle: 'Home', products: products };
    res.status(200).render('viewProduct', viewData);
}

exports.getProductDetails = async (req, res) => {
    try {
        let id = req.params.productId;
        let products = await productModel.showAllProducts();
        let product = products.find((product) => product.id === Number(id)); // Ensure both are numbers
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).render('productDetails', { pageTitle: 'Product Details', product: product });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
    }
};

// edit & delete product

exports.editProductDetails = async (req, res) => {
    if (req.method == 'POST') {
            let product = req.body;
            id = product.id;
            await productModel.saveEditProduct(id, product);
            let products = await productModel.showAllProducts();
            let viewData = { pageTitle: 'View Page Product Edit', products: products };
            res.status(200).render('viewProduct', viewData);
        } else {
            let id = req.params.productId;
            let product = await productModel.getProductById(id);
            if (!product) {
                res.status(404).render('addProduct', { pageTitle: 'View Page Product Edit', product: {} });
            }
            res.status(200).render('addProduct', { pageTitle: 'View Page Product Edit', product: product });
        }
    }
    
    
    exports.deleteProductDetails = async (req, res) => {
        let id = req.params.productId;
        // delete product
        await productModel.deleteProduct(id);
        // delete product from cart
        await cartModel.deleteCart(id);
        let products = await productModel.showAllProducts();
        let viewData = { pageTitle: 'Cart', products: products };
        res.status(200).render('viewProduct', viewData);
    }