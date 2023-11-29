import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {useColorModeValue} from "@chakra-ui/react";

interface ExampleChart {
}

const ExampleChart: React.FC<ExampleChart> = () => {

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
    },
    stroke: {
      curve: 'smooth',
    },
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    theme: {
      mode: useColorModeValue('light', 'dark'),
    }
  };

    return (
      <div>
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type='line'
          height={350}
        />
      </div>
    );
  }
;

export default ExampleChart;