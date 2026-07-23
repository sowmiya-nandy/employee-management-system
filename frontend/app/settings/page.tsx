"use client";

import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaLock,
  FaPalette,
  FaBell,
  FaBuilding,
  FaDatabase,
  FaInfoCircle
} from "react-icons/fa";


export default function SettingsPage() {


  const [user, setUser] = useState<any>(null);

const [darkMode,setDarkMode] = useState(false);


useEffect(()=>{

  const savedTheme = localStorage.getItem("theme");

  if(savedTheme === "dark"){
    setDarkMode(true);
    document.documentElement.classList.add("dark");
  }

},[]);

  const [notifications,setNotifications] = useState(true);



  useEffect(()=>{

    const storedUser = localStorage.getItem("user");

    if(storedUser){
      setUser(JSON.parse(storedUser));
    }

  },[]);



  return (

   <div className="
p-8 
min-h-screen
bg-gray-100
dark:bg-gray-900
">


      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>



      {/* Profile Settings */}

      <div className="bg-white rounded-xl shadow p-6 mb-6">


        <div className="flex items-center gap-3 mb-5">

          <FaUserCircle 
          className="text-blue-600"
          size={28}
          />

          <h2 className="text-xl font-semibold">
            Profile Settings
          </h2>

        </div>



        <div className="grid md:grid-cols-2 gap-5">


          <div>
            <label className="text-gray-500">
              Name
            </label>

            <input
            value="Admin"
            readOnly
            className="border p-3 rounded w-full mt-1"
            />

          </div>



          <div>

            <label className="text-gray-500">
              Email
            </label>

            <input
            value={user?.email || ""}
            readOnly
            className="border p-3 rounded w-full mt-1"
            />

          </div>


          <div>

            <label className="text-gray-500">
              Role
            </label>

            <input
            value={user?.role || "Admin"}
            readOnly
            className="border p-3 rounded w-full mt-1"
            />

          </div>


        </div>


        <button
        className="
        mt-5
        bg-blue-600
        text-white
        px-5
        py-2
        rounded-lg
        "
        >
          Edit Profile
        </button>


      </div>





      {/* Security */}

      <div className="bg-white rounded-xl shadow p-6 mb-6">


        <div className="flex gap-3 items-center mb-5">

          <FaLock 
          className="text-red-500"
          />

          <h2 className="text-xl font-semibold">
            Security
          </h2>

        </div>


        <div className="flex justify-between items-center">


          <div>

            <p className="font-medium">
              Password
            </p>

            <p className="text-gray-500">
              Change your account password
            </p>

          </div>



          <button
          className="
          bg-red-500
          text-white
          px-5
          py-2
          rounded-lg
          "
          >

          Change Password

          </button>


        </div>


      </div>





      {/* Appearance */}


      <div className="bg-white rounded-xl shadow p-6 mb-6">


        <div className="flex gap-3 items-center mb-5">

          <FaPalette
          className="text-purple-500"
          />

          <h2 className="text-xl font-semibold">
            Appearance
          </h2>

        </div>




        <div className="flex justify-between">


          <div>

            <p className="font-medium">
              Dark Mode
            </p>

            <p className="text-gray-500">
              Change dashboard theme
            </p>

          </div>


          <button
onClick={()=>{

 const newTheme = !darkMode;

 setDarkMode(newTheme);


 if(newTheme){

   document.documentElement.classList.add("dark");

   localStorage.setItem(
     "theme",
     "dark"
   );

 }
 else{

   document.documentElement.classList.remove("dark");

   localStorage.setItem(
     "theme",
     "light"
   );

 }

}}

className="
px-5
py-2
rounded-lg
bg-gray-700
text-white
"
>

{darkMode ? "Dark Mode" : "Light Mode"}

</button>


        </div>


      </div>






      {/* Notifications */}


      <div className="bg-white rounded-xl shadow p-6 mb-6">


        <div className="flex gap-3 items-center mb-5">


          <FaBell
          className="text-yellow-500"
          />


          <h2 className="text-xl font-semibold">
            Notifications
          </h2>


        </div>



        <div className="flex justify-between">


          <div>

          <p className="font-medium">
            Email Notifications
          </p>


          <p className="text-gray-500">
            Receive employee updates
          </p>

          </div>



          <input
          type="checkbox"
          checked={notifications}
          onChange={
            ()=>setNotifications(!notifications)
          }
          className="w-5 h-5"
          />


        </div>


      </div>






      {/* Company Settings */}


      <div className="bg-white rounded-xl shadow p-6 mb-6">


        <div className="flex gap-3 items-center mb-5">


          <FaBuilding
          className="text-green-600"
          />


          <h2 className="text-xl font-semibold">
            Company Settings
          </h2>


        </div>


        <input
        value="EDU TECH"
        readOnly
        className="border p-3 rounded w-full"
        />


      </div>






      {/* Data Management */}


      <div className="bg-white rounded-xl shadow p-6 mb-6">


        <div className="flex gap-3 items-center mb-5">


          <FaDatabase
          className="text-blue-500"
          />


          <h2 className="text-xl font-semibold">
            Data Management
          </h2>


        </div>



        <div className="flex gap-4">


          <button
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Export Data
          </button>


          <button
          className="bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Backup
          </button>


        </div>


      </div>






      {/* System Info */}

<div className="
bg-white
dark:bg-gray-800
dark:text-white
rounded-xl
shadow
p-6
">


        <div className="flex gap-3 items-center mb-5">


          <FaInfoCircle
          className="text-gray-600"
          />


          <h2 className="text-xl font-semibold">
            System Information
          </h2>


        </div>



        <p>
          Employee Management System
        </p>

        <p>
          Version: 1.0.0
        </p>

        <p>
          Built with Next.js, Node.js, PostgreSQL
        </p>


      </div>



    </div>

  );
}