"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loader from "@/components/common/Loader";

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      await api.post("/products", {
        productName,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
      });
      alert("Product Added Successfully");
      setProductName("");
      setCategory("");
      setPrice("");
      setStock("");
      setShowForm(false);
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Product");
    }
  };

  const editProduct = (prod: Product) => {
    setEditingId(prod._id);
    setProductName(prod.productName);
    setCategory(prod.category);
    setPrice(prod.price.toString());
    setStock(prod.stock.toString());
    setShowForm(true);
  };

  const updateProduct = async () => {
    try {
      await api.put(`/products/${editingId}`, {
        productName,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
      });
      alert("Product Updated Successfully");
      setEditingId(null);
      setProductName("");
      setCategory("");
      setPrice("");
      setStock("");
      setShowForm(false);
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to Update Product");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      alert("Product Deleted Successfully");
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Product");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        background: "#fff",
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0 }}>Products</h3>
        <Button
          text="+ Add Product"
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white"
        />
      </div>

      {showForm && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>{editingId ? "Edit Product" : "Add Product"}</h3>
          <Input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full mb-3"
          />
          <Input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-3"
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mb-3"
          />
          <Input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full mb-3"
          />
          <Button
            text={editingId ? "Update" : "Save"}
            onClick={editingId ? updateProduct : addProduct}
            className="bg-green-600 text-white mr-3"
          />
          <Button
            text="Cancel"
            onClick={() => setShowForm(false)}
            className="bg-slate-600 text-white"
          />
        </div>
      )}

      <table
        width="100%"
        cellPadding={10}
        style={{
          borderCollapse: "collapse",
          border: "1px solid #ddd",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#0070f3",
              color: "white",
            }}
          >
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>ID</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Product Name</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Category</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Price</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Stock</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px", border: "1px solid #ddd" }}>
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ border: "1px solid #ddd" }}>{product._id.substring(0, 8)}...</td>
                <td style={{ border: "1px solid #ddd" }}>{product.productName}</td>
                <td style={{ border: "1px solid #ddd" }}>{product.category}</td>
                <td style={{ border: "1px solid #ddd" }}>₹{product.price}</td>
                <td style={{ border: "1px solid #ddd" }}>{product.stock}</td>
                <td style={{ border: "1px solid #ddd" }}>
                  <Button
                    text="Edit"
                    onClick={() => editProduct(product)}
                    className="bg-teal-600 text-white mr-2"
                  />
                  <Button
                    text="Delete"
                    onClick={() => deleteProduct(product._id)}
                    className="bg-purple-600 text-white"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}