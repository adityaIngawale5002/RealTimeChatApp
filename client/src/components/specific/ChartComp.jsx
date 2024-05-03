import React from 'react'
import { Line,Doughnut } from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJs,Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend } from 'chart.js'
ChartJs.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  Filler,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  );

const LineChartOPtinon={
  responsive:true,
  plugins:{
    legend:{display:false},
    title:{display:false}
  },
  scales:{
    x:{
      grid:{display:false},
      
    },
    y:{
      beginAtZero:true,
      grid:{display:false}
    }
  }
}

const LineChart = ({value=[]}) => {
  const data={
    lables:["january","February","March","April","May","June","July"],

    datasets:[
      {
      data:value,
      label:"Revenue",
      fill:false,
      backgroundColor:"rgba( 75,192,192,0.2)",
      borderColor:"rgba(75,192,192,1)",
       }
    ],
    
  }
  return (
    <Line  data={data} options={LineChartOPtinon}/>
  )
}


const DoughnutChart = () => {
    return (
      <div>v</div>
    )
  }
  
export {LineChart,DoughnutChart}