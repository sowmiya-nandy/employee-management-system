"use client";
import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <Image
    src="/images/logo.png"
    alt="Logo"
    width={40}
    height={40}
  />

  <h2>Employee Management System</h2>
</div>
  );
}