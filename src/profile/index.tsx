import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/profile_page.css'
import { Sale } from '../types'
import { Link } from 'react-router-dom'
import { myFetch } from '../../utils/Myfetch'
import {  Card, Button, Row, Col  } from 'react-bootstrap'
import SingleUserLine from '../components/SingleUserLine'

interface ChartData {
  labels: any;
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

const Profile = () => {
  const user = useSelector((state:any) => state.user)
  const access_token = localStorage.getItem("token")
  const [chartData, setChartData] = useState<ChartData>({labels:[], datasets:[{label:'', data:[], backgroundColor:[]}]})

  const getUSerSales = async () => {
    const  res:any = await myFetch(`https://stockify-store-management.vercel.app/sales/user/${user?.id}`,{
      method:'GET',
      headers:{
        'Authorization': `Bearer ${access_token}`
      }
    })
    const data: { sales: Sale[] } = await res.json();

    const chartData:ChartData = {
      labels: data.sales.map(sale => sale.date),
      datasets: [
        {

          label: "Sales",
          data: data.sales.map(sale => sale.total_sale),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          }
      ]

    };

   setChartData(chartData);
  }
  
  useEffect(() =>{
    getUSerSales()
  },[])
  

  return (
    <div className="mt-5 d-flex flex-sm-column flex-lg-row justify-content-between align-items-center p-3">
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={user?.avatar} />
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <Card.Title>{user?.username}</Card.Title>
                  <img  src={ user.user_image} alt="user_image" style={{width: '40px', height: '40px',borderRadius: '50%' }}/>      
                </div>
                <Card.Text>
                  {user?.email}
                </Card.Text>
                <Link to="/profile/profile-change">
                  <Button variant="primary">Edit Profile</Button>
                </Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
              </Card>
          </Col>
        </Row>
        <SingleUserLine chartData={chartData}/>
    </div>
  )
}

export default Profile;