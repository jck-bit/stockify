import {Line} from 'react-chartjs-2'

import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


interface Props{
    chartData:any;
}


const SingleUserLine = ({chartData}:Props) => {
  return (
    <div>
        <Line data={chartData} />
    </div>
  )
}

export default SingleUserLine