"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Loader from "@/components/common/Loader";

interface Department {
  _id: string;
  department_name: string;
  manager_name: string;
  location: string;
}

export default function DepartmentTable() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [location, setLocation] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/departments");
      setDepartments(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const addDepartment = async () => {
    try {
      await api.post("/departments", {
        department_name: departmentName,
        manager_name: managerName,
        location,
      });
      alert("Department Added Successfully");
      setDepartmentName("");
      setManagerName("");
      setLocation("");
      setShowForm(false);
      getDepartments();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Department");
    }
  };

  const editDepartment = (dept: Department) => {
    setEditingId(dept._id);
    setDepartmentName(dept.department_name);
    setManagerName(dept.manager_name);
    setLocation(dept.location);
    setShowForm(true);
  };

  const updateDepartment = async () => {
    try {
      await api.put(`/departments/${editingId}`, {
        department_name: departmentName,
        manager_name: managerName,
        location,
      });
      alert("Department Updated Successfully");
      setEditingId(null);
      setDepartmentName("");
      setManagerName("");
      setLocation("");
      setShowForm(false);
      getDepartments();
    } catch (error) {
      console.log(error);
      alert("Failed to Update Department");
    }
  };

  const deleteDepartment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      await api.delete(`/departments/${id}`);
      alert("Department Deleted Successfully");
      getDepartments();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Department");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginTop: "20px",
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
        <h3 style={{ margin: 0 }}>Departments</h3>
        <Button
          text="+ Add Department"
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
          <h3>{editingId ? "Edit Department" : "Add Department"}</h3>
          <Input
            type="text"
            placeholder="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="w-full mb-3"
          />
          <Input
            type="text"
            placeholder="Manager Name"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            className="w-full mb-3"
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mb-3"
          />
          <Button
            text={editingId ? "Update" : "Save"}
            onClick={editingId ? updateDepartment : addDepartment}
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
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Department Name</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Manager Name</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Location</th>
            <th style={{ border: "1px solid #ddd", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "20px", border: "1px solid #ddd" }}>
                No departments found
              </td>
            </tr>
          ) : (
            departments.map((dept) => (
              <tr key={dept._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ border: "1px solid #ddd" }}>{dept._id.substring(0, 8)}...</td>
                <td style={{ border: "1px solid #ddd" }}>{dept.department_name}</td>
                <td style={{ border: "1px solid #ddd" }}>{dept.manager_name}</td>
                <td style={{ border: "1px solid #ddd" }}>{dept.location}</td>
                <td style={{ border: "1px solid #ddd" }}>
                  <Button
                    text="Edit"
                    onClick={() => editDepartment(dept)}
                    className="bg-teal-600 text-white mr-2"
                  />
                  <Button
                    text="Delete"
                    onClick={() => deleteDepartment(dept._id)}
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