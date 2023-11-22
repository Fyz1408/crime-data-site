import * as d3 from "d3";
import {FeatureCollection} from "geojson";

type MapProps = {
  width: number;
  height: number;
  data: FeatureCollection;
};

export const Map = ({ width, height, data }: MapProps) => {
  const projection = d3
    .geoMercator()
    .scale(1000)
    .center([-95, 45.86])

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = data.features
    .map((shape) => {
      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape) || ''}
          stroke="lightgray"
          strokeWidth={0.5}
          fill="#009933"
          fillOpacity={1}
        />
      );
    });

  return (
    <div>
      <svg width={width} height={height}>
        {allSvgPaths}
      </svg>
    </div>
);
};