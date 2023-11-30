import React from 'react'
import ReactApexChart from "react-apexcharts";
import {HeatMapData} from "../../types/ChartTypes";
import {useColorModeValue} from "@chakra-ui/react";
import {ApexOptions} from "apexcharts";

interface HeatMapProps {
  data: HeatMapData[]
}

const HeatMap: React.FC<HeatMapProps> = ({data}: HeatMapProps) => {
  const chartOptions: ApexOptions = {

    series: data.map((monthItem) => ({
      name: monthItem.month,
      data: monthItem.month === monthItem.month ? monthItem.monthData.map(dayItem => dayItem.count) : [],
    })),
    legend: {
      show: false
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.6,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 500,
              name: 'low',
              color: '#00ee00'
            },
            {
              from: 501,
              to: 550,
              name: 'low',
              color: '#00bb00'
            },
            {
              from: 551,
              to: 600,
              name: 'low',
              color: '#00A100'
            },
            {
              from: 551,
              to: 650,
              name: 'medium',
              color: '#48b1f0'
            },
            {
              from: 651,
              to: 700,
              name: 'medium',
              color: '#199dec'
            },
            {
              from: 701,
              to: 750,
              name: 'medium',
              color: '#128FD9'
            },
            {
              from: 751,
              to: 800,
              name: 'high',
              color: '#FFC94D'
            },
            {
              from: 801,
              to: 850,
              name: 'high',
              color: '#FFBA1A'
            },
            {
              from: 851,
              to: 900,
              name: 'high',
              color: '#FFB200'
            },
            {
              from: 901,
              to: 950,
              name: 'extreme',
              color: '#FF4D4D'
            },
            {
              from: 951,
              to: 1000,
              name: 'extreme',
              color: '#FF1A1A'
            },
            {
              from: 1001,
              to: 10000,
              name: 'extreme',
              color: '#FF0000'
            }
          ]
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1
    },
    chart: {
      height: 350,
      type: 'heatmap',
    },
    theme: {
      mode: useColorModeValue('light', 'dark'),
    },
    xaxis: {
      axisTicks: {
        show: true
      },
      tickAmount: 31,
      range: 31,
      labels: {
        show: true,
      }
    }
  };

  return (
    <>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="heatmap"
        height={370}
      />
    </>
  );
};

export default HeatMap;