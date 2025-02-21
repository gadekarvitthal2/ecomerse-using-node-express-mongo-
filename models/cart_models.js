const routePath = require('../utils/path');
const fs = require('fs').promises; // Use fs.promises for async operations

// Define the path to the JSON file
const productPath = routePath + '/data/cartData.json';

/**
 *  
 * 
 * Function to read data from the cart.json file asynchronously.
 * @returns {Promise<Array>} - Returns a promise that resolves to cart data.
 */

const readDataFromFile = async () => {
  try {
    const data = await fs.readFile(productPath, 'utf-8'); // Read file content as string
    if (data.trim() === '') {
      return []; // Return empty array if file is empty
    }
    return JSON.parse(data); // Parse and return JSON data
    }
    catch (err) {
    console.error('Error reading file:', err);
    return []; // Return empty array if file read fails
    }
}

/**
 * Function to add to cart a new product to the JSON file.
 * @param {Object} product - The product object to be added.
 */
let addTocart = async (product) => {
  try {
    const productCartData = await readDataFromFile(); // Get existing products
    const existingProductIndex = productCartData.findIndex(p => Number(p.id) == Number(product.id)); // Find existing product by ID
    // Check if product exists in cart
    if (!product.quantity) {
      product.quantity = 1; // Set default quantity to 1
    }
    if (!product.isEdit) {
      product.isEdit = true; // Set default isEdit to true
    }
    if (existingProductIndex !== -1) {
      // If product exists, update the quantity
      productCartData[existingProductIndex].quantity += product.quantity;
    } else {
      // If product does not exist, add new product
      productCartData.push(product);
    }

    await fs.writeFile(productPath, JSON.stringify(productCartData, null, 2)); // Write updated data
    console.log('Product added to Cart successfully!');
  } catch (err) {
    console.error('Error adding product:', err);
  }
};


let getCartDetails = async () => {
  try {
    return await readDataFromFile(); // Read and return cart data
  } catch (err) {
    console.error('Error getting cart data:', err);
    return []; // Return empty array if read fails
  }
};

const getCartProductById = async (productId) => {
  try {
    const productCartData = await readDataFromFile(); // Get existing products
    let data = productCartData.find(p => p.id === Number(productId));
    return data; // Find product by ID
  } catch (err) {
    console.error('Error getting product:', err);
    return null; // Return null if read fails
  }
}

const saveEditCart = async (productId,product) => { // Function to save edited product
  try {
    const productCartData = await readDataFromFile(); // Get existing products
    const existingProductIndex = productCartData.findIndex(p => p.id === Number(productId)); // Find existing product by ID
    if (existingProductIndex !== -1) {
      // If product exists, update the product
      productCartData[existingProductIndex] = product;
      await fs.writeFile(productPath, JSON.stringify(productCartData, null, 2)); // Write updated data
      console.log('Product edited successfully!');
    } else {
      console.error('Product not found!');
    }
  } catch (err) {
    console.error('Error editing product:', err);
  } 
}

const deleteCart = async (productId) => {
  try {
    const productCartData = await readDataFromFile(); // Get existing products
    console.log('productCartData', productCartData);
    
    const updatedProducts = productCartData.filter(p => Number(p.id) !== Number(productId)); // Filter out product by ID
    console.log('updatedProducts', updatedProducts);
    await fs.writeFile(productPath, JSON.stringify(updatedProducts, null, 2)); // Write updated data
    console.log('Product deleted successfully!');
  } catch (err) {
    console.error('Error deleting product:', err);
  }
}

module.exports = {
    addTocart,getCartDetails,saveEditCart,getCartProductById,deleteCart
}