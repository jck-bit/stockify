import {Bar} from 'react-chartjs-2';

import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

interface Props{
    chartData: any;
}

const BarChart = ({chartData}: Props) => {
  return <Bar  data={chartData}/>;
}

export default BarChart