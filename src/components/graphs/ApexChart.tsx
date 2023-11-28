import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from "apexcharts";

interface ApexChartProps {}

const ApexChart: React.FC<ApexChartProps> = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
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
  };

  return (
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type={chartOptions.chart?.type}
        height={370}
      />
    </>
  );
};

export default ApexChart;
