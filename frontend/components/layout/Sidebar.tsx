"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaBox,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";


export default function Sidebar() {

  const router = useRouter();


  const handleLogout = () => {

    // Remove JWT token
    localStorage.removeItem("token");

    // Remove user data
    localStorage.removeItem("user");

    // Redirect to login
    router.push("/login");
  };


  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-5 text-xl font-bold">
        EDU TECH
      </div>


      {/* Menu */}
      <nav className="flex-1 px-4">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
        >
          <FaHome />
          Dashboard
        </Link>


        <Link
          href="/employees"
          className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
        >
          <FaUsers />
          Employees
        </Link>


        <Link
          href="/departments"
          className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
        >
          <FaBuilding />
          Departments
        </Link>


        <Link
          href="/products"
          className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
        >
          <FaBox />
          Products
        </Link>


        <Link
          href="/settings"
          className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
        >
          <FaCog />
          Settings
        </Link>


      </nav>


      {/* Logout */}
      <div className="p-4">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 
          hover:bg-red-600 rounded"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>


    </aside>
  );
}