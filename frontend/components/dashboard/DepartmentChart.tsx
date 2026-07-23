"use client";

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



export default function DepartmentChart(){


const data = {

labels:[
"IT",
"HR",
"Finance",
"Sales"
],


datasets:[

{
label:"Departments",

data:[
45,
30,
15,
10
],


backgroundColor:[

"#2563eb",
"#10b981",
"#f59e0b",
"#ef4444"

],


borderColor:[

"#ffffff",
"#ffffff",
"#ffffff",
"#ffffff"

],


borderWidth:2

}

]

};



const options={

responsive:true,

plugins:{

legend:{
position:"bottom" as const
}

}

};



return(

<div
className="
bg-white
p-6
rounded-xl
shadow-md
mt-8
"
>


<h2 className="
text-xl
font-bold
mb-4
">

🥧 Department Distribution

</h2>


<Pie
data={data}
options={options}
/>


</div>

);


}