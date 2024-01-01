import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Box } from '@mantine/core';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'right' as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['Asia', 'Africa', 'Europe', 'North America'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
