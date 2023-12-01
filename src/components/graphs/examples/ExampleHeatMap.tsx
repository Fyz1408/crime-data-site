import React from 'react'
import ReactApexChart from "react-apexcharts";
import {useColorModeValue} from "@chakra-ui/react";
import {ApexOptions} from "apexcharts";

const ExampleHeatMap: React.FC = () => {
  function generateData(count: number, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  const chartOptions: ApexOptions = {
    series: [{
      name: 'Jan',
      data: generateData(31, {
        min: -30,
        max: 55
      })
    },
      {
        name: 'Feb',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Mar',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Apr',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'May',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Jun',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Jul',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Aug',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Sep',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Oct',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Nov',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      },
      {
        name: 'Dec',
        data: generateData(31, {
          min: -30,
          max: 55
        })
      }
    ],
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [{
            from: -30,
            to: 5,
            name: 'low',
            color: '#00A100'
          },
            {
              from: 6,
              to: 20,
              name: 'medium',
              color: '#128FD9'
            },
            {
              from: 21,
              to: 45,
              name: 'high',
              color: '#FFB200'
            },
            {
              from: 46,
              to: 55,
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
    title: {
      text: 'HeatMap Chart with Color Range'
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

export default ExampleHeatMap;