"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [router]);

  // Wait until authentication is checked
  if (isAuthenticated === null) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  // If not authenticated, don't render the page
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}