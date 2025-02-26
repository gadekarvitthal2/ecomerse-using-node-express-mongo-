// const e = require('express');
// const product = require('../models/product_modal');
// const saveProduct = require('../models/product_modal').addProduct;
// const productModel = require('../models/product_modal');
// const cartModel = require('../models/cart_models');
// exports.getAddProduct = (req, res) => {
//     res.status(200).render('addProduct', { pageTitle: 'Add Product' });
// }

// exports.postAddProduct = async (req, res) => {
//     let productData = {
//         id:Date.now(),
//         name: req.body.name,
//         image: req.body.image,
//         price: req.body.price,
//         description: req.body.description
//     }
//     await saveProduct(productData);
//     let products = await productModel.showAllProducts();
//     let viewData = { pageTitle: 'Home', products: products };
//     res.status(200).render('viewProduct', viewData);
// }

// exports.getProductDetails = async (req, res) => {
//     try {
//         let id = req.params.productId;
//         let products = await productModel.showAllProducts();
//         let product = products.find((product) => product.id === Number(id)); // Ensure both are numbers
//         if (!product) {
//             return res.status(404).send('Product not found');
//         }
//         res.status(200).render('productDetails', { pageTitle: 'Product Details', product: product });
//     } catch (error) {
//         console.error('Error fetching product details:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

// // edit & delete product

// exports.editProductDetails = async (req, res) => {
//     if (req.method == 'POST') {
//             let product = req.body;
//             id = product.id;
//             await productModel.saveEditProduct(id, product);
//             let products = await productModel.showAllProducts();
//             let viewData = { pageTitle: 'View Page Product Edit', products: products };
//             res.status(200).render('viewProduct', viewData);
//         } else {
//             let id = req.params.productId;
//             let product = await productModel.getProductById(id);
//             if (!product) {
//                 res.status(404).render('addProduct', { pageTitle: 'View Page Product Edit', product: {} });
//             }
//             res.status(200).render('addProduct', { pageTitle: 'View Page Product Edit', product: product });
//         }
//     }
    
    
//     exports.deleteProductDetails = async (req, res) => {
//         let id = req.params.productId;
//         // delete product
//         await productModel.deleteProduct(id);
//         // delete product from cart
//         await cartModel.deleteCart(id);
//         let products = await productModel.showAllProducts();
//         let viewData = { pageTitle: 'Cart', products: products };
//         res.status(200).render('viewProduct', viewData);
//     }
const productModel = require('../models/product_modal');
const cartModel = require('../models/cart_models');

exports.getAddProduct = (req, res) => {
    res.status(200).render('addProduct', { pageTitle: 'Add Product' });
};

exports.postAddProduct = async (req, res) => {
    try {
        const productData = {
            id: Date.now(),
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description
        };
        await productModel.addProduct(productData);
        const products = await productModel.showAllProducts();
        res.status(200).render('viewProduct', { pageTitle: 'Home', products });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        const products = await productModel.showAllProducts();
        const product = products.find(product => product.id === Number(productId));
        
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.status(200).render('productDetails', { pageTitle: 'Product Details', product });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editProductDetails = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const product = req.body;
            const { id } = product;
            await productModel.saveEditProduct(id, product);
            const products = await productModel.showAllProducts();
            res.status(200).render('viewProduct', { pageTitle: 'View Page Product Edit', products });
        } else {
            const { productId } = req.params;
            const product = await productModel.getProductById(productId);
            
            if (!product) {
                return res.status(404).render('addProduct', { pageTitle: 'View Page Product Edit', product: {} });
            }

            res.status(200).render('addProduct', { pageTitle: 'View Page Product Edit', product });
        }
    } catch (error) {
        console.error('Error editing product details:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteProductDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        await productModel.deleteProduct(productId);
        await cartModel.deleteCart(productId);
        const products = await productModel.showAllProducts();
        res.status(200).render('viewProduct', { pageTitle: 'Cart', products });
    } catch (error) {
        console.error('Error deleting product details:', error);
        res.status(500).send('Internal Server Error');
    }
};