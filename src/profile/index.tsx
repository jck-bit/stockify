import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../css/profile_page.css'
import { Sale } from '../types'
import { Link } from 'react-router-dom'
import { myFetch } from '../../utils/Myfetch'
import { Container, Card, Button, Row, Col  } from 'react-bootstrap'
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
    <div className="mt-5 d-flex justify-content-between al">
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={user?.avatar} />
              <Card.Body>
                <Card.Title>{user?.name}</Card.Title>
                <Card.Text>
                  {user?.email}
                  <br/>
                  {user?.phone}
                </Card.Text>
                <Link to="/profile/edit">
                  <Button variant="primary">Edit Profile</Button>
                </Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                <div className="chart">
                  <canvas id="myChart"></canvas>
                </div>
              </Card.Footer>
              </Card>
          </Col>
        </Row>
        <SingleUserLine chartData={chartData}/>
    </div>
  )
}

export default Profile;