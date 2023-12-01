import ReactApexChart from "react-apexcharts";
import {useColorModeValue} from "@chakra-ui/react";
import {ApexOptions} from "apexcharts";

interface ExampleDonut {
}

const ExampleDonut: React.FC<ExampleDonut> = () => {

    const donutOptions: ApexOptions = {
      series: [37, 43, 13,7],
      labels: ['A', 'B', 'C', 'D'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      theme: {
        mode: useColorModeValue('light', 'dark'),
      }
    };

    return (
      <div>
        <ReactApexChart
          options={donutOptions}
          series={donutOptions.series}
          type="donut"
          height={370}
        />
      </div>
    );
  }
;

export default ExampleDonut;