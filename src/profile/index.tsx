import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/profile_page.css'
import { Sale } from '../types'
import SingleUserLine from '../components/SingleUserLine'

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const Profile = () => {
  const user = useSelector((state:any) => state.user)
  const access_token = localStorage.getItem("token")
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] })

  const getUSerSales = async () => {
    const  res = await fetch(`http://localhost:5000/sales/user/${user?.id}`,{
      method:'GET',
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
    })
    const data: { sales: Sale[] } = await res.json();
    console.log(data);

    const chartData = {
      labels: data.sales.map(item => item.date),
      datasets: [
        {
          label: 'Sales',
          data: data.sales.map(item => item.total_sale),
          backgroundColor: '#3f51b5'
        }
      ]
};

   setChartData(chartData);
  }
  
  useEffect(() =>{
    getUSerSales()
  },[])
  

  return (
    <div className="container_profile">
        <div className="view_user_profile">
           <section className='view_my_details'>
              <div>
                <img src={user?.user_image} alt="user-image" />
              </div>
              <div>
                <h5>{user?.username}</h5>
              </div>
           </section>
           <section className="view_personal_info">
              <div className='personal_info'>
                <h5>Email:</h5>
                <p>{user?.email}</p>             
              </div>
              <div className='personal_info'>
                <h5>Your id:</h5>
                <p>{user?.id}</p>             
              </div>
              <div className='personal_info'>
                <h5>Total sales:</h5>
                <p>55000</p>             
              </div>
           </section>
           <section className='edit_profile'>
            <button>Edit profile</button>
           </section>
        </div>
        <div className="view_user_sales">
            <SingleUserLine chartData={chartData}/>
        </div>
    </div>
  )
}

export default Profile