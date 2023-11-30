export type DonutData = {
  label: string;
  count: number;
}

export type PieData = {
  label: string;
  count: number;
}

export type HeatMapData = {
  month: string
  monthData: Month[]
}

export type Month = {
  day: string
  count: number
}