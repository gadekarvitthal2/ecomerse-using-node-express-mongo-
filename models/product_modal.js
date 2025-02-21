const routePath = require('../utils/path');
const fs = require('fs').promises; // Use fs.promises for async operations

// Define the path to the JSON file
const productPath = routePath + '/data/product.json';

/**
 * Function to read data from the product.json file asynchronously.
 * @returns {Promise<Array>} - Returns a promise that resolves to product data.
 */
const readDataFromFile = async () => {
  try {
    const data = await fs.readFile(productPath, 'utf-8'); // Read file content as string
    if(!data) {
      return [];
    }
    return JSON.parse(data); // Parse and return JSON data
  } catch (err) {
    console.error('Error reading file:', err);
    return []; // Return empty array if file read fails
  }
};

/**
 * Function to add a new product to the JSON file.
 * @param {Object} product - The product object to be added.
 */
const addProduct = async (product) => {
  try {
    const productData = await readDataFromFile(); // Get existing products
    productData.push(product); // Add new product
    await fs.writeFile(productPath, JSON.stringify(productData, null, 2)); // Write updated data
    console.log('Product added successfully!');
  } catch (err) {
    console.error('Error adding product:', err);
  }
};

/**
 * Function to display all products from the JSON file.
 */
const showAllProducts = async () => {
  try {
    const productData = await readDataFromFile(); // Fetch product data
    if(!productData) {
      return [];
    }
    return productData; // Return product data
  } catch (err) {
    console.error('Error displaying products:', err);
    return []; // Return empty array if data fetch fails
  }
};




const getProductById = async (productId) => {
  try {
    const productCartData = await readDataFromFile(); // Get existing products
    let data = productCartData.find(p => Number(p.id) === Number(productId));
    
    return data; // Find product by ID
  } catch (err) {
    console.error('Error getting product:', err);
    return null; // Return null if read fails
  }
}

const saveEditProduct = async (productId,product) => { // Function to save edited product
  try {
    const productData = await readDataFromFile(); // Get existing products
    const existingProductIndex = productData.findIndex(p => Number(p.id) === Number(productId)); // Find existing product by ID
    if (existingProductIndex !== -1) {
    // If product exists, update the product
    productData[existingProductIndex] = product;
    await fs.writeFile(productPath, JSON.stringify(productData, null, 2)); // Write updated data
      console.log('Product edited successfully!');
    } else {
      console.error('Product not found!');
    }
  } catch (err) {
    console.error('Error editing product:', err);
  } 
}

const deleteProduct = async (productId) => {
  try {
    const productData = await readDataFromFile(); // Get existing products
    const updatedProducts = productData.filter(p => Number(p.id) !== Number(productId)); // Filter out product by ID
    await fs.writeFile(productPath, JSON.stringify(updatedProducts, null, 2)); // Write updated data
    console.log('Product deleted successfully!');
  } catch (err) {
    console.error('Error deleting product:', err);
  }
}

// Export functions if needed
module.exports = { readDataFromFile, addProduct, showAllProducts, getProductById,saveEditProduct,deleteProduct };
