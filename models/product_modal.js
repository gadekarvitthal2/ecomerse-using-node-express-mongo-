const routePath = require('../utils/path');
const fs = require('fs').promises; // Use fs.promises for async operations
const {fetchData} = require('../database');

// Define the path to the JSON file
const productPath = routePath + '/data/product.json';

/**
 * Function to read data from the product.json file asynchronously.
 * @returns {Promise<Array>} - Returns a promise that resolves to product data.
 */
const readDataFromFile = async () => {
  try {
    const data = await fetchData() //Get data from sql
    if(!data){
      console.log('No Data Found');
      return [];
    }
    return data;
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
console.log('product :>> ', product);
    await fs.writeFile(productPath, JSON.stringify(productData, null, 2)); // Write updated data
    console.log('Product added successfully!');
  } catch (err) {
    console.error('Error adding product:', err);
  }
};

/**
 * Function to display all products from the JSON file.
 * @returns {Promise<Array>} - Returns a promise that resolves to product data.
 */
const showAllProducts = async () => {
  try {
    return await readDataFromFile(); // Fetch and return product data
  } catch (err) {
    console.error('Error displaying products:', err);
    return []; // Return empty array if data fetch fails
  }
};

/**
 * Function to get a product by its ID.
 * @param {number} productId - The ID of the product to retrieve.
 * @returns {Promise<Object|null>} - Returns a promise that resolves to the product object or null if not found.
 */
const getProductById = async (productId) => {
  try {
    const productData = await readDataFromFile(); // Get existing products
    return productData.find(p => Number(p.id) === Number(productId)) || null; // Find product by ID
  } catch (err) {
    console.error('Error getting product:', err);
    return null; // Return null if read fails
  }
};

/**
 * Function to save edited product details in the JSON file.
 * @param {number} productId - The ID of the product to edit.
 * @param {Object} product - The updated product object.
 */
const saveEditProduct = async (productId, product) => {
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
};

/**
 * Function to delete a product from the JSON file.
 * @param {number} productId - The ID of the product to delete.
 */
const deleteProduct = async (productId) => {
  try {
    const productData = await readDataFromFile(); // Get existing products
    const updatedProducts = productData.filter(p => Number(p.id) !== Number(productId)); // Filter out product by ID
    await fs.writeFile(productPath, JSON.stringify(updatedProducts, null, 2)); // Write updated data
    console.log('Product deleted successfully!');
  } catch (err) {
    console.error('Error deleting product:', err);
  }
};

module.exports = {
  readDataFromFile,
  addProduct,
  showAllProducts,
  getProductById,
  saveEditProduct,
  deleteProduct
};