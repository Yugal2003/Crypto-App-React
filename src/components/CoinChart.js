import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './CoinChart.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loading from './Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({currency}) => {
    const [chartData, setChartData]=useState([])
    const {id} = useParams()
    const [days, setDays]=useState(1)
    
    const CoinChartData=async()=>{
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
            setChartData(data.prices)
            // console.log(data.prices)
        } catch (error) {
            console.log(error)  
        }
    }

    useEffect(()=>{
        CoinChartData() 
    },[currency, id, days])

  const myData = {
    labels: chartData.map((value)=>{
     const date = new Date(value[0])
     const time = 
     date.getHours()> 12 
     ? `${date.getHours() -12} : ${date.getMinutes()} PM` 
     : `${date.getHours()} : ${date.getMinutes()} AM`
      return days===1 ? time : date.toLocaleDateString() 
    }), 
    datasets:[
        {
            label: ` Price in Past Days ${days} in ${currency} `,
            data: chartData.map((value)=>value[1]),
            borderColor: 'orange',
            borderWidth: '3' 
        }
    ]
    
  }




  return (
     <>
     {
      chartData.length === 0 ? ( <Loading/>) : (

        <div>
        <Line data={myData} options={{
          elements:{
              point:{
                  radius:1, 
              }
          }
        }} style={{width:"60rem"}} />
  
  <div className='btn'>
               <button className='chart_btn' onClick={()=>setDays(1)} >24 hours</button>
               <button className='chart_btn' onClick={()=>setDays(30)}>1 Month</button>
               <button className='chart_btn' onClick={()=>setDays(365)}>1 Year</button>
             </div>
      </div>
      )
     }
     </>
  )
}

export default CoinChart
