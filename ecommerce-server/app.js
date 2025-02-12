const express = require('express');
const bodyParser = require('body-parser');
const products = require('./products'); // Import the products module
const middleware = require('./middleware'); // Import custom middleware

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(middleware.cors);    // Handle CORS (Cross-Origin Resource Sharing)

// Register the routes
app.get('/', (req, res) => {
    res.send('Welcome to the eCommerce API');
});
app.get('/products', products.listProducts);  // Get all products (ensure this function exists)
app.get('/products/:id', products.getProduct);  // Get product by ID
app.post('/products', products.createProduct);  // Create a new product
app.put('/products/:id', products.updateProduct);  // Update product by ID
app.delete('/products/:id', products.deleteProduct);  // Delete product by ID

// Error handling middleware
app.use(middleware.handleError);   // Custom error handling
app.use(middleware.notFound);      // Custom 404 handler

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
