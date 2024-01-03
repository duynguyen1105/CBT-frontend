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
import { useGetUserInfo } from 'hooks/useGetUserInfo';

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

const labels = ['Users', 'Questions', 'Tests'];

// const data = [
//   {
//     label: 'Total users',
//     stats: workspaceInfo.totalUsers,
//     progress: (workspaceInfo.totalUsers / LIMIT.USERS) * 100,
//     color: 'teal',
//     icon: IconUser,
//   },
//   {
//     label: 'Total tests',
//     stats: workspaceInfo.totalTests,
//     progress: (workspaceInfo.totalTests / LIMIT.TESTS) * 100,
//     color: 'blue',
//     icon: IconFileDescription,
//   },
//   {
//     label: 'Total questions',
//     stats: workspaceInfo.totalQuestions,
//     progress: (workspaceInfo.totalQuestions / LIMIT.QUESTIONS) * 100,
//     color: 'red',
//     icon: IconStack2,
//   },
// ] as const;

export function BarChart({ info }: { info: number[] }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: info,
        backgroundColor: 'rgba(32, 41, 220, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
