const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const db = require("../config/db");
const Product = require("../models/Product");

async function migrateProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const products = await Product.find();

    console.log(`Found ${products.length} products`);

    for (const product of products) {
      const exists = await db.query(
        "SELECT * FROM products WHERE product_name=$1",
        [product.productName]
      );

      if (exists.rows.length === 0) {
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

        console.log(`Inserted: ${product.productName}`);
      } else {
        console.log(`Skipped: ${product.productName}`);
      }
    }

    console.log("Migration Completed");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

migrateProducts();