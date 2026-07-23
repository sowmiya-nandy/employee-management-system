const db = require("../config/db");
const Product = require("../models/Product");

// Get all products
const getAllProducts = async () => {
  return await Product.find();
};

// Get product by ID
const getProductById = async (id) => {
  return await Product.findById(id);
};

const addProduct = async (product) => {
  // Save to MongoDB
  const mongoProduct = await Product.create(product);

  // Save to PostgreSQL
  await db.query(
    `
    INSERT INTO products
    (
      product_name,
      category,
      price,
      stock
    )
    VALUES ($1,$2,$3,$4)
    `,
    [
      product.productName,
      product.category,
      product.price,
      product.stock,
    ]
  );

  return mongoProduct;
};
const updateProduct = async (id, product) => {
  const mongoProduct = await Product.findByIdAndUpdate(
    id,
    product,
    { new: true }
  );

  if (!mongoProduct) {
    return null;
  }

  await db.query(
    `
    UPDATE products
    SET
      product_name=$1,
      category=$2,
      price=$3,
      stock=$4
    WHERE product_name=$5
    `,
    [
      product.productName,
      product.category,
      product.price,
      product.stock,
      mongoProduct.productName,
    ]
  );

  return mongoProduct;
};
const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    return null;
  }

  await Product.findByIdAndDelete(id);

  await db.query(
    `
    DELETE FROM products
    WHERE product_name=$1
    `,
    [product.productName]
  );

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};