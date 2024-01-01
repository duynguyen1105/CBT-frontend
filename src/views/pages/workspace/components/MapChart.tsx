import { faker } from '@faker-js/faker';
import { Box } from '@mantine/core';
import { Chart } from 'chart.js';
import {
  ChoroplethController,
  ColorScale,
  GeoFeature,
  ProjectionScale,
  topojson,
} from 'chartjs-chart-geo';
import { useEffect, useState } from 'react';

// register controller in chart.js and ensure the defaults are set
Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

const MapChart = () => {
  let chart: any;
  const [countries, setCountries] = useState<any[]>([]); // [

  const fetchData = async () => {
    const res = await fetch('https://unpkg.com/world-atlas/countries-50m.json');

    const json = await res.json();
    const countries = (topojson.feature(json, json.objects.countries) as any).features;

    setCountries(countries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let chart: any;

    const data = {
      labels: countries?.map((d: any) => d.properties.name),
      datasets: [
        {
          label: 'Countries',
          data: countries?.map((d: any) => ({
            feature: d,
            value: faker.number.int({ min: 0, max: 100 }),
          })),
        },
      ],
    };
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (context) {
      chart = new Chart(context, {
        type: 'choropleth',
        data,
        options: {
          showOutline: true,
          showGraticule: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            projection: {
              axis: 'x',
              projection: 'equalEarth',
            },
          },
        },
      });
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [countries]);

  return <canvas id="canvas"></canvas>;
};

export default MapChart;
