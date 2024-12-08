import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartData = {
  xAxis: [
    { scaleType: 'band', dataKey: 'day', label: 'Days of the Week' },
  ],
  series: [
    {
      dataKey: 'thisWeek',
      label: 'This Week',
      color: '#1D4ED8', // Blue for this week
    },
    {
      dataKey: 'lastWeek',
      label: 'Last Week',
      color: '#34D399', // Green for last week
    },
  ],
  data: [
    { day: 'Mon', thisWeek: 10, lastWeek: 4 },
    { day: 'Tues', thisWeek: 6, lastWeek: 2 },
    { day: 'Wed', thisWeek: 8, lastWeek: 5 },
    { day: 'Thurs', thisWeek: 10, lastWeek: 7 },
    { day: 'Fri', thisWeek: 6, lastWeek: 2 },
    { day: 'Sat', thisWeek: 8, lastWeek: 4 },
    { day: 'Sun', thisWeek: 9, lastWeek: 6 },
  ],
};

const chartSetting = {
  yAxis: [
    {
      label: 'Guide Rating',
    },
  ],
  width: 600, // Adjusted to fit mockup dimensions
  height: 400, // Adjusted for better layout
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
    [`.${axisClasses.bottom} .${axisClasses.label}`]: {
      transform: 'translate(0, 10px)',
    },
  },
};

export default function BarChartGuideRating() {
  return (
    <BarChart
      dataset={chartData.data}
      xAxis={chartData.xAxis}
      series={chartData.series}
      {...chartSetting}
    />
  );
}