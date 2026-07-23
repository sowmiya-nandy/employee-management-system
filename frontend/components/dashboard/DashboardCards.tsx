"use client";

import {
  FaUsers,
  FaBuilding,
  FaBoxOpen,
  FaIndianRupeeSign
} from "react-icons/fa6";


export default function DashboardCards() {


  const cards = [

    {
      title:"Employees",
      value:"120",
      change:"+10 This Month",
      icon:<FaUsers />,
      color:"#3b82f6"
    },


    {
      title:"Departments",
      value:"8",
      change:"2 New",
      icon:<FaBuilding />,
      color:"#10b981"
    },


    {
      title:"Products",
      value:"35",
      change:"15 Available",
      icon:<FaBoxOpen />,
      color:"#f59e0b"
    },


    {
      title:"Revenue",
      value:"₹1,20,000",
      change:"+12%",
      icon:<FaIndianRupeeSign />,
      color:"#ef4444"
    }

  ];


  return (

    <div
      className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-4 
      gap-6
      "
    >


      {
        cards.map((card)=>(


          <div
            key={card.title}
            className="
            bg-white
            rounded-xl
            p-6
            shadow-md
            hover:shadow-xl
            transition-all
            duration-300
            "
            style={{
              borderLeft:`6px solid ${card.color}`
            }}
          >


            <div
              className="text-3xl mb-4"
              style={{
                color:card.color
              }}
            >
              {card.icon}
            </div>



            <h3 className="text-gray-500 text-lg">
              {card.title}
            </h3>



            <h1 className="text-3xl font-bold mt-2">
              {card.value}
            </h1>



            <p className="text-green-600 mt-2">
              {card.change}
            </p>



          </div>


        ))
      }


    </div>

  );

}