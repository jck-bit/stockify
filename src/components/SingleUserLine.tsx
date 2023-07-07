import {Bar } from 'react-chartjs-2'

import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { Container } from 'react-bootstrap';
Chart.register(CategoryScale);


interface Props{
    chartData:any;
}


const SingleUserLine = ({chartData}:Props) => {
  return (
    <Container>
        <Bar data={chartData} />
    </Container>
  )
}

export default SingleUserLine