import React from 'react'
import ReactApexChart from "react-apexcharts";

interface DonutChartProps {
  data: number[],
  labels: string[]
}

const DonutChart: React.FC<DonutChartProps> = ({data, labels}: DonutChartProps) => {
  const donutOptions = {
    series: data,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      }
    },
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <>
      <ReactApexChart
        options={donutOptions}
        series={donutOptions.series}
        type="donut"
        height={370}
      />
    </>
  );
};

export default DonutChart;