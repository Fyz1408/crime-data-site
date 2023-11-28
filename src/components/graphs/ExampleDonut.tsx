import ReactApexChart from "react-apexcharts";

interface ExampleChart {
}

const ExampleDonut: React.FC<ExampleChart> = () => {
    const donutOptions = {
      series: [44, 43, 13],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        }
      },
      labels: ['Male', 'Female', 'Other'],
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