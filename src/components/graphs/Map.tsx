import * as d3 from "d3";
import {FeatureCollection} from "geojson";
import './Map.css'

type MapProps = {
  width: number;
  height: number;
  data: FeatureCollection;
};

export const Map = ({ width, height, data }: MapProps) => {
  const projection = d3
    .geoMercator()
    .scale(900)
    .center([-95, 45.86])

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = data.features
    .map((shape) => {
      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape) || ''}
          stroke="black"
          strokeWidth={0.5}
          fill="#edce4a"
          fillOpacity={1}
        />
      );
    });


  return (
    <div id='chart'>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} preserveAspectRatio="xMinYMid">
        {allSvgPaths}
      </svg>
    </div>
);
};