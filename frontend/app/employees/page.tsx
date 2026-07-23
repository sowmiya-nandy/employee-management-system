"use client";

import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EmployeeTable from "@/components/employee/EmployeeTable";

export default function Employees() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <center>
          <h1>Employee Details</h1>
</center>
        <EmployeeTable />
      </MainLayout>
    </ProtectedRoute>
  );
}