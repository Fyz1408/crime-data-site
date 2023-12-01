import React from 'react'
import ReactApexChart from "react-apexcharts";
import {ColumnData} from "../../types/ChartTypes";
import {ApexOptions} from "apexcharts";
import {useColorModeValue} from "@chakra-ui/react";

interface ColumnChartProps {
  data: ColumnData[]
}

const ColumnChart: React.FC<ColumnChartProps> = ({data}: ColumnChartProps) => {
  const chartOptions: ApexOptions = {
    series: [{
      data: data.map(item => item.count),
    }],
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: data.map(item => item._id),
    },
    theme: {
      mode: useColorModeValue('light', 'dark'),
    }
  };

  return (
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={370}
      />
    </>
  );
};

export default ColumnChart;