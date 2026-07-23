"use client";

import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DepartmentTable from "@/components/department/DepartmentTable";

export default function Departments() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <center>
        <h1>DEPARTMENTS</h1>

        </center>

        <DepartmentTable />
      </MainLayout>
    </ProtectedRoute>
  );
}