import  { useEffect, useState } from "react";
import "../css/SalesTable.css";
import { setLogout, setSales } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sale } from "../types";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { myFetch } from "../../utils/Myfetch";

const SalesTable  = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const salesData = useSelector((state: any) => state.sales);
  const access_token = localStorage.getItem('token')

  const [chartData, setChartData] = useState({
    labels:salesData.map((sale: Sale) => sale.date),
    datasets: [{
      label: "Sales",
      data: salesData.map((sale: Sale) => sale.total_sale),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
    }]
  });
  const getSales = async () => {
    const response:any = await myFetch("https://stockify-store-management.vercel.app/sales", {
      method: "GET",
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
    });
    if (response.ok){
      const data = await response.json();
      dispatch(setSales({ sales: data.sales }));    
    }else{
      const errorData = await response.json();
      if (errorData?.msg === "Token has expired"){
        dispatch(setLogout());
        navigate('/login');
      }
    }
  }

useEffect(() =>{
  getSales()

},[])

  return (
     <div className="sales-table" style={{width: "1000px"}}>
      <BarChart  chartData={chartData} />
     </div>
  ) 

}
export default SalesTable
