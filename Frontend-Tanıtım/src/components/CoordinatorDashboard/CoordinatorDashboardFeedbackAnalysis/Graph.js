import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { name: 'Jan', scheduled: 40, completed: 24 },
  { name: 'Feb', scheduled: 30, completed: 13 },
  { name: 'Mar', scheduled: 20, completed: 9 },
  { name: 'Apr', scheduled: 27, completed: 18 },
];

const MinimalGraph = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="scheduled" stroke="#8884d8" />
        <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default MinimalGraph;