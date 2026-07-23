"use client";
import React from "react";
import { useEffect, useState } from "react";

import api from "@/services/api";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import SearchBar from "@/components/common/SearchBar";
import Loader from "@/components/common/Loader";
import { FaUserCircle } from "react-icons/fa";
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  image?: string | null;
  role?: string;
  contact?: string;
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [sort, setSort] = useState("id-ASC");
const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
const [image, setImage] = useState<File | null>(null);
const [editingId, setEditingId] = useState<number | null>(null);
const [showProfile, setShowProfile] = useState(false);

const [selectedEmployee, setSelectedEmployee] =
  useState<Employee | null>(null);
  useEffect(() => {
  getEmployees(currentPage);
}, [currentPage, sort]);

const getEmployees = async (page = 1) => {
  try {
    setLoading(true);

    const [sortBy, order] = sort.split("-");

    const res = await api.get(
      `/employees?page=${page}&limit=5&sortBy=${sortBy}&order=${order}`
    );

    setEmployees(res.data.employees);
    setCurrentPage(res.data.currentPage);
    setTotalPages(res.data.totalPages);
  } catch (error) {
    console.log(error);
    alert("Failed to fetch employees");
  } finally {
    setLoading(false);
  }
};

  const addEmployee = async () => {
    try {
      const formData = new FormData();

formData.append("name", name);
formData.append("email", email);
formData.append("department", department);
formData.append("salary", salary);

if (image) {
  formData.append("image", image);
}

await api.post("/employees", formData);

      alert("Employee Added Successfully");

      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
      setImage(null);
      setShowForm(false);

      getEmployees();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Employee");
    }
  };
const editEmployee = (emp: Employee) => {
  setEditingId(emp.id);

  setName(emp.name);
  setEmail(emp.email);
  setDepartment(emp.department);
  setSalary(emp.salary.toString());

  setShowForm(true);
};
const updateEmployee = async () => {
  try {
    await api.put(`/employees/${editingId}`, {
      name,
      email,
      department,
      salary: Number(salary),
    });

    alert("Employee Updated Successfully");

    setEditingId(null);

    setName("");
    setEmail("");
    setDepartment("");
    setSalary("");

    setShowForm(false);

    getEmployees();
  } catch (error) {
    console.log(error);
    alert("Failed to Update Employee");
  }
};
const deleteEmployee = async (id: number) => {
  try {
    await api.delete(`/employees/${id}`);

    alert("Employee Deleted Successfully");

    getEmployees();
  } catch (error) {
    console.log(error);
    alert("Failed to Delete Employee");
  }
};
  if (loading) {
  return <Loader />;
}

const uploadProfile = async (
  id: number,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files?.length) return;

  const formData = new FormData();
  formData.append("image", e.target.files[0]);

  try {
    await api.put(`/employees/${id}/image`, formData);

    alert("Profile picture updated");

    getEmployees(currentPage);
  } catch (err) {
    console.log(err);
    alert("Image upload failed");
  }
};

const viewEmployee = (emp: Employee) => {
  setSelectedEmployee(emp);
  setShowProfile(true);
};
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
     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "15px",
  }}
>
  <SearchBar
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={sort}
    onChange={(e) => {
      setSort(e.target.value);
      setCurrentPage(1);
    }}
    style={{
      padding: "8px",
      borderRadius: "5px",
    }}
  >
    <option value="id-ASC">Default</option>
    <option value="name-ASC">Name (A-Z)</option>
    <option value="name-DESC">Name (Z-A)</option>
    <option value="department-ASC">Department (A-Z)</option>
    <option value="department-DESC">Department (Z-A)</option>
  </select>

  <Button
    text="+ Add Employee"
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
         <h3>{editingId ? "Edit Employee" : "Add Employee"}</h3>
<Input
  type="text"
  placeholder="Employee Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full mb-3"
/>
<Input
  type="email"
  placeholder="Employee Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full mb-3"
/>

<Input
  type="text"
  placeholder="Department"
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
  className="w-full mb-3"
/>

          <Input
  type="number"
  placeholder="Salary"
  value={salary}
  onChange={(e) => setSalary(e.target.value)}
  className="w-full mb-3"
/>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }}
/>

 <Button
  text={editingId ? "Update" : "Save"}
  onClick={editingId ? updateEmployee : addEmployee}
  className="bg-green-600 text-white mr-3"
/>

         <Button
  text="Cancel"
  onClick={() => setShowForm(false)}
  className="bg-slate-600 text-white"
/>
        </div>
      )}
      {showProfile && selectedEmployee && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        width: "400px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      {selectedEmployee.image ? (
        <img
          src={`http://localhost:5000/uploads/${selectedEmployee.image}`}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <FaUserCircle size={120} color="#999" />
      )}

      <h2>{selectedEmployee.name}</h2>

      <p>
        <b>Email:</b> {selectedEmployee.email}
      </p>

      <p>
        <b>Department:</b> {selectedEmployee.department}
      </p>

      <p>
        <b>Salary:</b> ₹{selectedEmployee.salary}
      </p>

      <Button
        text="Close"
        onClick={() => setShowProfile(false)}
        className="bg-red-600 text-white"
      />
    </div>
  </div>
)}

      <div
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
     <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  }}
>
  {employees
    .filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((emp) => (
  <div
  key={emp.id}
  style={{
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    transition: "0.3s",
  }}
>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          {emp.image ? (
            <img
              src={`http://localhost:5000/uploads/${emp.image}`}
              width={70}
              height={70}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() =>
                document.getElementById(`file-${emp.id}`)?.click()
              }
            />
          ) : (
            <FaUserCircle
              size={70}
              color="#999"
              style={{ cursor: "pointer" }}
              onClick={() =>
                document.getElementById(`file-${emp.id}`)?.click()
              }
            />
          )}

          <div>
            <h3>{emp.name}</h3>
            <p>ID : {emp.id}</p>
          </div>
        </div>

        <p>📧 {emp.email}</p>
        <p>🏢 {emp.department}</p>
        <p>💰 ₹{emp.salary}</p>

        <input
          id={`file-${emp.id}`}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => uploadProfile(emp.id, e)}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <Button
            text="View"
            onClick={() => viewEmployee(emp)}
            className="bg-blue-600 text-white"
          />

          <Button
            text="Edit"
            onClick={() => editEmployee(emp)}
            className="bg-indigo-600 text-white"
          />

          <Button
            text="Delete"
            onClick={() => deleteEmployee(emp.id)}
            className="bg-gray-700 text-white"
          />
        </div>
      </div>
    ))}
</div>
      </div>
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <Button
    text="Previous"
    onClick={() => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }}
    className="bg-gray-600 text-white"
  />

  <span
    style={{
      padding: "8px 15px",
      fontWeight: "bold",
    }}
  >
    {currentPage} / {totalPages}
  </span>

  <Button
    text="Next"
    onClick={() => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }}
    className="bg-blue-600 text-white"
  />
</div>
    </div>
  );
}