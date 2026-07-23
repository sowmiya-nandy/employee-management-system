"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { FaUserCircle } from "react-icons/fa";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  image: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export default function EmployeeDetails() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/employees/${params.id}`);
        setEmployee(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch employee details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEmployee();
    }
  }, [params.id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div style={{ color: "red", padding: "20px" }}>{error}</div>
          <Button
            text="Back to Employees"
            onClick={() => router.push("/employees")}
            className="bg-blue-600 text-white"
          />
        </MainLayout>
      </ProtectedRoute>
    );
  }

  if (!employee) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div style={{ padding: "20px" }}>Employee not found</div>
          <Button
            text="Back to Employees"
            onClick={() => router.push("/employees")}
            className="bg-blue-600 text-white"
          />
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>Employee Profile</h1>

        <div
          style={{
            background: "#fff",
            padding: "40px",
            marginTop: "20px",
            borderRadius: "10px",
            maxWidth: "800px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            {employee.image ? (
              <img
                src={`http://localhost:5000/uploads/${employee.image}`}
                alt={employee.name}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #0070f3",
                }}
              />
            ) : (
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  background: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid #0070f3",
                }}
              >
                <FaUserCircle size={120} color="#888" />
              </div>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div>
              <label style={{ fontWeight: "bold", color: "#555" }}>Name</label>
              <p style={{ fontSize: "16px", color: "#000", margin: "5px 0" }}>
                {employee.name}
              </p>
            </div>
            <div>
              <label style={{ fontWeight: "bold", color: "#555" }}>Email</label>
              <p style={{ fontSize: "16px", color: "#000", margin: "5px 0" }}>
                {employee.email}
              </p>
            </div>
            <div>
              <label style={{ fontWeight: "bold", color: "#555" }}>
                Department
              </label>
              <p style={{ fontSize: "16px", color: "#000", margin: "5px 0" }}>
                {employee.department}
              </p>
            </div>
            <div>
              <label style={{ fontWeight: "bold", color: "#555" }}>Salary</label>
              <p style={{ fontSize: "16px", color: "#000", margin: "5px 0" }}>
                Rs. {employee.salary.toLocaleString()}
              </p>
            </div>
          </div>

          {employee.createdAt && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "bold", color: "#555" }}>
                Member Since
              </label>
              <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                {new Date(employee.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}

          <div style={{ marginTop: "30px" }}>
            <Button
              text="Back to Employees"
              onClick={() => router.push("/employees")}
              className="bg-blue-600 text-white"
            />
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}