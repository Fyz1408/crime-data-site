import React from 'react'
import ReactApexChart from "react-apexcharts";
import {DonutData, PieData} from "../../types/ChartTypes";
import {useColorModeValue} from "@chakra-ui/react";
import {ApexOptions} from "apexcharts";

interface PieChartProps {
  data: PieData[]
}

const PieChart: React.FC<PieChartProps> = ({data}: PieChartProps) => {
  const randomPaletteNumber = Math.floor(Math.random() * 10) + 1;

  const donutOptions: ApexOptions = {
    series: data.map(item => item.count),
    labels: data.map(item => item.label),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
          type: 'pie',
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    theme: {
      mode: useColorModeValue('light', 'dark'),
      //palette: `palette${randomPaletteNumber}`,
    },
    stroke: {
      width: 0
    }
  };

  return (
    <>
      <ReactApexChart
        options={donutOptions}
        series={donutOptions.series}
        type="pie"
        height={370}
      />
    </>
  );
};

export default PieChart;