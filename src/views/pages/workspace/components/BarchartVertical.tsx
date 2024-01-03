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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Workspaces',
    },
  },
};

const labels = [
  'Workspace 1',
  'Workspace 2',
  'Workspace 3',
  'Workspace 4',
  'Workspace 5',
  'Workspace 6',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Users',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Questions',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function BarChartVertical() {
  return <Bar options={options} data={data} />;
}
