import React, {useEffect} from 'react';
import '../SalesTable.css';
import { setSales } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import { Sale } from '../types';

function SalesTable() {
  const dispatch = useDispatch();
  const sales = useSelector((state: any) => state.sales);

  const getSales = async () => {
    const response = await fetch( "https://stockify-store-management.vercel.app/sales", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    dispatch(setSales({sales: data.sales}));
  };
  
  useEffect(() =>{
    getSales()
  },[])
  return (
    <div>
      <h1>Sales Report</h1>
      <table>
        <thead>
          <tr>
            <th>product</th>
            <th>Date Sold</th>
            <th>Total Sale</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {sales && sales.map((sale: Sale) => {
            return(
            <tr key={sale.id}>
              <td>{sale.product}</td>
              <td>{sale.date}</td>
              <td>{sale.total_sale}</td>
              <td>user {sale.user}</td>
            </tr>
         ) })}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
