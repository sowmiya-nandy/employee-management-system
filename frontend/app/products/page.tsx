"use client";

import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProductTable from "@/components/product/ProductTable";

export default function Products() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <h1>Products</h1>

        <p>Manage Product Details</p>

        <ProductTable />
      </MainLayout>
    </ProtectedRoute>
  );
}