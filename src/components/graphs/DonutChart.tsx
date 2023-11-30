import React from 'react'
import ReactApexChart from "react-apexcharts";
import {DonutData} from "../../types/ChartTypes";
import {ApexOptions} from "apexcharts";
import {useColorModeValue} from "@chakra-ui/react";

interface DonutChartProps {
  data: DonutData[]
}

const DonutChart: React.FC<DonutChartProps> = ({data}: DonutChartProps) => {
  const chartOptions: ApexOptions = {
    series: data.map(item => item.count),
    labels: data.map(item => item.label),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
          type: 'pie'
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
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="donut"
        height={370}
      />
    </>
  );
};

export default DonutChart;