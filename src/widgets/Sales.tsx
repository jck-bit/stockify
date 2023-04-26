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
    <div id="container">
      <div id="sideMenu">
        <h1>Sales Report</h1>

        <ul className="menu">
          <li>Main</li>
          <li>Dashboard</li>
          <li>
            Reports <span className="notification">8</span>
          </li>
          <li>Groups</li>
        </ul>
        <ul className="menu">
          <li>Users</li>
        </ul>
        <div className="addCategory">
          <span className="plus">+</span> Add sale
        </div>
      </div>
      <div id="content">
        <div className="mainChart">
          <BarChart chartData={chartData} />
          <h2>Total Sales</h2>

          <div className="clearFix"></div>

          <div id="totalSales">
            <div className="col">
              <div id="creditSales" className="progressBar"></div>
              <h3>$36,059</h3>
              <span className="progressTitle">Credit Sales</span>
            </div>
            <div className="col">
              <div id="channelSales" className="progressBar"></div>
              <h3>$24,834</h3>
              <span className="progressTitle">Channel Sales</span>
            </div>
            <div className="col">
              <div id="directSales" className="progressBar"></div>
              <h3>$15,650</h3>
              <span className="progressTitle">Direct Sales</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable
