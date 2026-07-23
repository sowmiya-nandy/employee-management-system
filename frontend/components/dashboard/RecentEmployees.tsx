"use client";


import {
  FaUserCircle
} from "react-icons/fa";


export default function RecentEmployees(){


const employees = [

{
name:"John",
department:"IT",
time:"2 mins ago"
},

{
name:"Priya",
department:"HR",
time:"15 mins ago"
},

{
name:"Rahul",
department:"Finance",
time:"1 hour ago"
},

{
name:"Arun",
department:"Sales",
time:"Yesterday"
}

];


return (

<div
className="
bg-white
p-6
rounded-xl
shadow-md
mt-8
"
>


<h2
className="
text-xl
font-bold
mb-5
"
>
👥 Recent Employees
</h2>



<div className="space-y-4">


{
employees.map((employee)=>(


<div
key={employee.name}
className="
flex
items-center
justify-between
border-b
pb-3
"
>


<div
className="
flex
items-center
gap-3
"
>

<FaUserCircle
className="
text-3xl
text-blue-500
"
/>


<div>

<p className="font-semibold">
{employee.name}
</p>


<p className="text-gray-500">
{employee.department}
</p>


</div>


</div>



<p
className="
text-sm
text-gray-500
"
>

{employee.time}

</p>



</div>


))
}


</div>


</div>

);


}