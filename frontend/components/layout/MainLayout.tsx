"use client";

import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
        }}
      >
        <Navbar />

        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}