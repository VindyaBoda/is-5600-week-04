const Products = require('./products');
const autoCatch = require('./lib/auto-catch');

/**
 * Handle the root route
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}

/**
 * List all products with pagination and filtering
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  });
  res.json(products);
}

/**
 * Get a single product
 */
async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) {
    return next();
  }
  return res.json(product);
}

/**
 * Create a new product
 */
async function createProduct(req, res) {
  const newProduct = req.body;
  console.log('Product created:', newProduct);
  res.status(201).json(newProduct);
}

/**
 * Update an existing product
 */
async function updateProduct(req, res) {
  const { id } = req.params;
  const updatedProduct = req.body;
  console.log(`Product with ID ${id} updated:`, updatedProduct);
  res.status(200).json(updatedProduct);
}

/**
 * Delete a product
 */
async function deleteProduct(req, res) {
  const { id } = req.params;
  console.log(`Product with ID ${id} deleted`);
  res.status(202).json({ message: 'Product deleted' });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
});
