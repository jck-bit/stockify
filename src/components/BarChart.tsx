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
    <Container className='mt-5'>
       <Row>
        <Col>
          <h2>Bar Chart</h2>
        </Col>
       </Row>
       <Row>
        <Col>
          <p>The bar chart is used to display the data in a horizontal way. The bar chart is used to display the data in a horizontal way. The bar chart is used to display the data in a horizontal way. The bar chart is used to display the data in a horizontal way. The bar chart is used to display the data in a horizontal way.</p>
        </Col>
       </Row>
    </Container>
  )
}

export default BarChart