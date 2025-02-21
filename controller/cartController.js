
const cartModel = require('../models/cart_models');
const productModel = require('../models/product_modal');

exports.addCartDetails = async (req, res) => {
    let id = req.body.product_id;
    let products = await productModel.showAllProducts();
    let product = products.find((product) => product.id === Number(id)); // Ensure both are numbers    
    await cartModel.addTocart(product);
    let cartData = await cartModel.getCartDetails();
    let viewData = { pageTitle: 'Cart', cartData: cartData };
    res.status(200).render('viewCart', viewData);
}

exports.getCartDetails = async (req, res) => {
    let cartData = await cartModel.getCartDetails();    
    let viewData = { pageTitle: 'Cart', cartData: cartData };
    res.status(200).render('viewCart', viewData);
}

exports.editCartDetails = async (req, res) => {
if (req.method == 'POST') {
        let product = req.body;
        id = product.id;
        await cartModel.saveEditCart(id, product);
        let cartData = await cartModel.getCartDetails();
        let viewData = { pageTitle: 'Cart', cartData: cartData };
        res.status(200).render('viewCart', viewData);
    } else {
        let id = req.params.productId;
        let product = await cartModel.getCartProductById(id);
        if (!product) {
            res.status(404).render('addProduct', { pageTitle: 'Edit Product', product: {} });
        }
        res.status(200).render('addProduct', { pageTitle: 'Edit Product', product: product });
    }


    // let id = req.params.productId;
    // await cartModel.saveEditCart(id);
    // let product = await cartModel.getCartDetails();
    // res.status(200).render('addProduct', { pageTitle: 'Edit Product', product: product[0] });
}


exports.deleteCartDetails = async (req, res) => {
    let id = req.params.productId;
    
    await cartModel.deleteCart(id);
    let cartData = await cartModel.getCartDetails();
    let viewData = { pageTitle: 'Cart', cartData: cartData };
    res.status(200).render('viewCart', viewData);
}