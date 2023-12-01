import React from 'react'
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";


interface ExampleColumn {
}

const ExampleColumn: React.FC<ExampleColumn> = () => {
  const chartOptions: ApexOptions = {
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30]
    }],
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        }
      }
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
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'],
      ]
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

export default ExampleColumn;