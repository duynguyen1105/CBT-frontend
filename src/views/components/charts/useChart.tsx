import { useCallback } from "react";
import { renderToString } from 'react-dom/server';
import { MantineTheme, useMantineTheme } from "@mantine/core";
import { IconUser } from '@tabler/icons-react';
import { BarChartProps, ChartCommonProps, ChartOption, ChartType, GaugeChartProps } from "./type";
import defaultTheme from 'apps/theme';

export interface UseChart {
  getOption(type: ChartType): ChartOption;
}

const { padding, chart } = defaultTheme.layout;
const spacing = padding * 2;

const generateBarOption = <T extends ChartCommonProps>(props: T, theme: MantineTheme): ChartOption => {
  const {
    title,
    legend = true,
    grid = true,
    left = spacing,
    right = spacing,
    top = spacing,
    bottom = padding,
    collection,
    data,
    categories,
    radius = true,
    barWidth = chart.bar.width
  } = props as BarChartProps;

  const { colorScheme, colors } = theme;
  const color = colorScheme === 'dark' ? colors.dark[0] : colors.dark[9];

  return {
    title: {
      show: !!title,
      text: title,
      textStyle: {
        color
      },
    },
    legend: {
      show: legend,
      textStyle: {
        color
      }
    },
    grid: {
      show: grid,
      borderColor: colors.gray[8],
      left,
      top,
      right,
      bottom
    },
    xAxis: {
      data: collection,
    },
    yAxis: {},
    textStyle: {
      color
    },
    series: categories.map((_, index) => ({
      type: 'bar',
      data: data.map(c => c[index]),
      color: chart.colors[index % (chart.colors.length - 1)],
      barWidth,
      barMaxWidth: chart.bar.maxWidth,
      barMinWidth: chart.bar.minWidth,
      itemStyle: {
        borderRadius: radius ? [barWidth / 2, barWidth / 2, 0, 0]: undefined
      }
    })),
    darkMode: colorScheme === 'dark'
  }
}

const generateGaugeOption = <T extends ChartCommonProps>(props: T): ChartOption => {
  const {
    centerTop = "80%"
  } = props as GaugeChartProps;

  const iconSVGString = renderToString(<IconUser size={40} />);
  const iconDataURL = `data:image/svg+xml;utf8,${encodeURIComponent(
    iconSVGString
  )}`;

  return {
    graphic: {
      elements: [
        {
          type: 'text',
          style: {
            text: '65%',
            font: 'bold 24px Arial',
            fill: '#000',
          },
          left: 'center',
          top: 'center',
        },
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: [
            {
              type: 'rect',
              z: 100,
              left: 'center',
              top: 'middle',
              shape: {
                width: 40,
                height: 40,
              },
              style: {
                backgroundImage: `url(${iconDataURL})`,
                backgroundSize: '100% 100%',
              } as any,
            },
          ],
        },
      ],
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        pointer: {
          show: false,
          length: '60%',
          width: 8,
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.5, '#91c7ae'],
              [0.8, '#63869e'],
              [1, '#c23531'],
            ],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          length: 15,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        axisLabel: {
          show: false,
          distance: -30,
          fontSize: 14,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          fontSize: 24,
          offsetCenter: [0, '60%'],
        },
        data: [
          {
            value: 65,
            name: 'Completion Rate',
          },
        ],
      },
    ],
  }

  // return {
  //   series: [
  //     {
  //       type: 'gauge',
  //       progress: {
  //         show: true,
  //         width: 18
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 18
  //         }
  //       },
  //       axisTick: {
  //         show: false
  //       },
  //       splitLine: {
  //         length: 15,
  //         lineStyle: {
  //           width: 2,
  //           color: '#999'
  //         }
  //       },
  //       axisLabel: {
  //         distance: 25,
  //         color: '#999',
  //         fontSize: 20
  //       },
  //       anchor: {
  //         show: true,
  //         showAbove: true,
  //         size: 25,
  //         itemStyle: {
  //           borderWidth: 10
  //         }
  //       },
  //       title: {
  //         show: false
  //       },
  //       detail: {
  //         valueAnimation: true,
  //         fontSize: 80,
  //         offsetCenter: [0, '70%']
  //       },
  //       data: [
  //         {
  //           value: 70,
  //         }
  //       ]
  //     }
  //   ]
  // }
}

export default function useChat<T extends ChartCommonProps>(props: T) {

  const theme = useMantineTheme();

  const getOption = useCallback((type: ChartType): ChartOption => {
    switch (type) {
      case 'bar':
        return generateBarOption(props, theme);
      case 'gauge':
        return generateGaugeOption(props);
      default:
        return {}
    }
  }, [ props, theme ]);

  return {
    getOption
  }
}