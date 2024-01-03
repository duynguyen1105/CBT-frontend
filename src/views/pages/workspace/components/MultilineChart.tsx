import { faker } from '@faker-js/faker';
import { PATHS } from 'api/paths';
import { callApiWithAuth } from 'api/utils';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LineOptions,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

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

function getNearestMonths() {
  const currentMonth = new Date().getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const nearestMonths = [];
  for (let i = 1; i <= 5; i++) {
    const prevMonth = (currentMonth - i + 12) % 12;
    nearestMonths.unshift(months[prevMonth]); // Unshift to add to the beginning of the array
  }

  return nearestMonths;
}

export const data = {
  labels: getNearestMonths(),
  datasets: [
    {
      label: 'Users',
      data: getNearestMonths().map(() => faker.number.int({ min: 0, max: 10 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      cubicInterpolationMode: 'monotone' as LineOptions['cubicInterpolationMode'],
      tension: 0.4,
    },
    {
      label: 'Questions',
      data: getNearestMonths().map(() => faker.number.int({ min: 0, max: 10 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      cubicInterpolationMode: 'monotone' as LineOptions['cubicInterpolationMode'],
      tension: 0.4,
    },
    {
      label: 'Tests',
      data: getNearestMonths().map(() => faker.number.int({ min: 0, max: 10 })),
      borderColor: 'rgb(53, 162, 22)',
      backgroundColor: 'rgba(53, 162, 22, 0.5)',
      cubicInterpolationMode: 'monotone' as LineOptions['cubicInterpolationMode'],
      tension: 0.4,
    },
  ],
};

export function MultilineChart() {
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const res = await callApiWithAuth(PATHS.)
  //   }
  // }, []);

  return <Line options={options} data={data} />;
}
