import * as echarts from 'echarts';
import Chart from 'echarts-for-react';

export type ChartOption = echarts.EChartsOption;

export interface ChartCommonProps {
  categories: string[];
  collection: string[];
  data: number[][];
  title?: string;
  legend?: boolean;
  grid?: boolean;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  radius?: number;
  className?: string;
}

export interface BarChartProps extends ChartCommonProps {
  barWidth?: number;
}

export interface GaugeChartProps extends ChartCommonProps {
  centerTop?: string;
}

export type ChartType =
 | "bar"
 | "boxplot"
 | "candlestick"
 | "custom"
 | "effectScatter"
 | "funnel"
 | "gauge"
 | "graph"
 | "heatmap"
 | "line"
 | "lines"
 | "map"
 | "parallel"
 | "pictorialBar"
 | "pie"
 | "radar"
 | "sankey"
 | "scatter"
 | "sunburst"
 | "themeRiver"
 | "tree"
 | "treemap";

export { Chart };
