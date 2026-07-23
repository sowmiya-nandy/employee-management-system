"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import api from "@/services/api";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

      console.log("Login Response:", response.data);

      if (!response.data.token) {
        alert("Token not received from backend!");
        console.log("Backend Response:", response.data);
        return;
      }

      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert("Login Successful");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Login Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f6f8",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {/* Company Logo */}
        <Image
          src="/images/logo.png"
          alt="Company Logo"
          width={80}
          height={80}
          style={{
            margin: "0 auto 15px",
          }}
        />

        {/* Title */}
      <div
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  <Image
    src="/images/logo.png"
    alt="Logo"
    width={80}
    height={80}
  />

  <h2>Employee Management System</h2>
</div>

        {/* Email */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-5 mb-4"
        />

        {/* Password */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5"
        />

        {/* Login Button */}
        <Button
          text="Login"
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        />
      </div>
    </div>
  );
}