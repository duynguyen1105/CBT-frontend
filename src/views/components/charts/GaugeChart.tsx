import React, { forwardRef } from 'react';
import { Chart, GaugeChartProps } from './type';
import useChart from './useChart';

const GaugeChart = forwardRef<Chart, GaugeChartProps>(
  function GaugeChart(props, ref) {

    const { getOption } = useChart(props);
    const option = getOption('gauge');

    return (
      <Chart
        ref={ref}
        style={{ height: '100%', width: '100%' }}
        option={option}
      />
    );
  }
);

GaugeChart.displayName = 'Chart.Gauge';
export default GaugeChart;
