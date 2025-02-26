
// const cartModel = require('../models/cart_models');
// const productModel = require('../models/product_modal');

// exports.addCartDetails = async (req, res) => {
//     let id = req.body.product_id;
//     let products = await productModel.showAllProducts();
//     let product = products.find((product) => product.id === Number(id)); // Ensure both are numbers    
//     await cartModel.addTocart(product);
//     let cartData = await cartModel.getCartDetails();
//     let viewData = { pageTitle: 'Cart', cartData: cartData };
//     res.status(200).render('viewCart', viewData);
// }

// exports.getCartDetails = async (req, res) => {
//     let cartData = await cartModel.getCartDetails();    
//     let viewData = { pageTitle: 'Cart', cartData: cartData };
//     res.status(200).render('viewCart', viewData);
// }

// exports.editCartDetails = async (req, res) => {
// if (req.method == 'POST') {
//         let product = req.body;
//         id = product.id;
//         await cartModel.saveEditCart(id, product);
//         let cartData = await cartModel.getCartDetails();
//         let viewData = { pageTitle: 'Cart', cartData: cartData };
//         res.status(200).render('viewCart', viewData);
//     } else {
//         let id = req.params.productId;
//         let product = await cartModel.getCartProductById(id);
//         if (!product) {
//             res.status(404).render('addProduct', { pageTitle: 'Edit Product', product: {} });
//         }
//         res.status(200).render('addProduct', { pageTitle: 'Edit Product', product: product });
//     }
// }


// exports.deleteCartDetails = async (req, res) => {
//     let id = req.params.productId;
    
//     await cartModel.deleteCart(id);
//     let cartData = await cartModel.getCartDetails();
//     let viewData = { pageTitle: 'Cart', cartData: cartData };
//     res.status(200).render('viewCart', viewData);
// }

// exports.viewCartDetails = async (req, res) => {
//     let cartData = await cartModel.getCartDetails();
//     let totalPrice = await cartModel.getTotal();
//     let viewData = { pageTitle: 'Cart Details', cartData: cartData, totalPrice: totalPrice };
//     res.status(200).render('cart', viewData);
// }

const cartModel = require('../models/cart_models');
const productModel = require('../models/product_modal');

exports.addCartDetails = async (req, res) => {
    try {
        const { product_id } = req.body;
        const products = await productModel.showAllProducts();
        const product = products.find(product => product.id === Number(product_id));
        
        if (!product) {
            return res.status(404).send('Product not found');
        }

        await cartModel.addTocart(product);
        const cartData = await cartModel.getCartDetails();
        res.status(200).render('viewCart', { pageTitle: 'Cart', cartData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.getCartDetails = async (req, res) => {
    try {
        const cartData = await cartModel.getCartDetails();
        res.status(200).render('viewCart', { pageTitle: 'Cart', cartData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.editCartDetails = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const product = req.body;
            const { id } = product;
            await cartModel.saveEditCart(id, product);
            const cartData = await cartModel.getCartDetails();
            res.status(200).render('viewCart', { pageTitle: 'Cart', cartData });
        } else {
            const { productId } = req.params;
            const product = await cartModel.getCartProductById(productId);
            
            if (!product) {
                return res.status(404).render('addProduct', { pageTitle: 'Edit Product', product: {} });
            }

            res.status(200).render('addProduct', { pageTitle: 'Edit Product', product });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteCartDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        await cartModel.deleteCart(productId);
        const cartData = await cartModel.getCartDetails();
        res.status(200).render('viewCart', { pageTitle: 'Cart', cartData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.viewCartDetails = async (req, res) => {
    try {
        const cartData = await cartModel.getCartDetails();
        const totalPrice = await cartModel.getTotal();
        res.status(200).render('cart', { pageTitle: 'Cart Details', cartData, totalPrice });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};