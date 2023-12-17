import React, { forwardRef } from 'react';
import Chart from 'echarts-for-react';
import { BarChartProps } from './type';
import useChart from './useChart';
import { useCommonChartStyle } from './common';

/**
 * Bar chart
 *
 * Example:
 *
 * ```tsx
 * import defaultTheme from 'apps/theme';
 * import BarChart from 'views/components/charts/BarChart'
 *
 * <BarChart
 *    categories={[ '2021', '2022', '2023' ]}
 *    collection={[ 'Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie' ]}
 *    data={[
 *      [ 43.3, 85.8, 93.7 ],
 *      [ 83.1, 73.4, 55.1 ],
 *      [ 86.4, 65.2, 82.5 ],
 *      [ 72.4, 53.9, 39.1 ]
 *    ]}
 *    legend
 *    grid
 *    title="Bar chart"
 *    left={defaultTheme.layout.padding * 2}
 *    right={defaultTheme.layout.padding * 2}
 *    bottom={defaultTheme.layout.padding}
 *    top={defaultTheme.layout.padding * 2}
 *    radius
 *    className="barchart"
 * />
 *
 * ```
 */
const BarChart = forwardRef<Chart, BarChartProps>(function BarChart(props, ref) {
  const { className } = props;
  const { classes, cx } = useCommonChartStyle();
  const { getOption } = useChart(props);
  const option = getOption('bar');
  return <Chart ref={ref} className={cx(classes.root, className)} option={option} />;
});

BarChart.displayName = 'Chart.Bar';
export default BarChart;
