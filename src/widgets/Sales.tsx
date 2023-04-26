import  { useEffect, useState } from "react";
import "../SalesTable.css";
import { setSales } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { Sale } from "../types";
import BarChart from "../components/BarChart";

const SalesTable  = () => {
  const dispatch = useDispatch();
  const salesData = useSelector((state: any) => state.sales);
  console.log(salesData)
  const access_token = localStorage.getItem('token')

  const [chartData, setChartData] = useState({
    labels: salesData.map((sale: Sale) => sale.date),
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
    const response = await fetch("http://127.0.0.1:5000/sales", {
      method: "GET",
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
    });
    const data = await response.json();
    console.log(data);
    dispatch(setSales({ sales: data.sales }));
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
