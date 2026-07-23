"use client";

import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardCards from "@/components/dashboard/DashboardCards";
import EmployeeGrowthChart from "@/components/dashboard/EmployeeGrowthChart";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import RecentEmployees from "@/components/dashboard/RecentEmployees";
export default function Dashboard() {

  return (
    <ProtectedRoute>
      <MainLayout>

        {/* Welcome Banner */}
        <div
          className="
          bg-gradient-to-r 
          from-blue-600 
          to-indigo-600 
          text-white 
          p-8 
          rounded-xl 
          mb-6 
          shadow-lg
          "
        >

          <h1 className="text-3xl font-bold">
            👋 Welcome Back
          </h1>


          <p className="mt-2 text-lg">
            Manage your employees efficiently from one place.
          </p>


          <p className="mt-4 text-sm">
            {new Date().toDateString()}
          </p>

        </div>


        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold mb-2">
          Dashboard
        </h1>


        <p className="mb-6 text-gray-600">
          Welcome to the Employee Management Dashboard
        </p>


        {/* Cards */}
        <DashboardCards />
<div
className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
"
>

<EmployeeGrowthChart />



</div>


      </MainLayout>
    </ProtectedRoute>
  );
}