import {Bar} from 'react-chartjs-2';
import { Container,Row,Col } from 'react-bootstrap';

//inside a small screen, the bar chart will be displayed in a horizontal way.



import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface Props{
    chartData: any;
}

const BarChart = ({chartData}: Props) => {
  return (
    <Container>
        
                <Bar data={chartData}></Bar>
    </Container>
  )
}

export default BarChart