const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

// Get all products
router.get("/", verifyToken, productController.getAllProducts);

// Get product by ID
router.get("/:id", verifyToken, productController.getProductById);

// Add product
router.post("/", verifyToken, productController.addProduct);

// Update product
router.put("/:id", verifyToken, productController.updateProduct);

// Delete product
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;