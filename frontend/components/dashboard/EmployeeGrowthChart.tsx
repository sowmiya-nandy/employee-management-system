"use client";

import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export default function EmployeeGrowthChart(){


const data = {

  labels:[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun"
  ],


  datasets:[

    {
      label:"Employees",

      data:[
        20,
        35,
        50,
        70,
        95,
        120
      ],


      borderColor:"#2563eb",

      backgroundColor:"rgba(37,99,235,0.2)",


      pointBackgroundColor:"#2563eb",

      pointBorderColor:"#ffffff",

      pointRadius:6,


      fill:true,

      tension:0.4,

      borderWidth:3

    }

  ]

};



const options={

responsive:true,

plugins:{

legend:{
display:true
},

title:{
display:true,
text:"Employee Growth"
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

📈 Employee Growth Chart

</h2>


<Line
data={data}
options={options}
/>


</div>

);


}