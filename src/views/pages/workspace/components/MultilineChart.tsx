import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Box } from '@mantine/core';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Students',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      cubicInterpolationMode: 'monotone' as LineOptions['cubicInterpolationMode'],
      tension: 0.4,
    },
    {
      label: 'Total Students Engagement',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      cubicInterpolationMode: 'monotone' as LineOptions['cubicInterpolationMode'],
      tension: 0.4,
    },
    {
      label: 'Total Content Watched',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(53, 162, 22)',
      backgroundColor: 'rgba(53, 162, 22, 0.5)',
      cubicInterpolationMode: 'monotone' as LineOptions['cubicInterpolationMode'],
      tension: 0.4,
    },
  ],
};

export function MultilineChart() {
  return <Line options={options} data={data} />;
}
