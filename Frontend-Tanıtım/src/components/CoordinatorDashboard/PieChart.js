import React, { useState, useEffect } from 'react';
import { PieChart as RePieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const PieChart = () => {
  const [data, setData] = useState([
    { name: 'Engineering', value: 30 },
    { name: 'Business Administration', value: 15 },
    { name: 'Art, Design, and Architecture', value: 20 },
    { name: 'Others', value: 35 },
  ]);

  // Colors for PieChart slices
  const COLORS = ['#343aeb', '#ffa500', '#fc59a5', '#222222'];

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Departments of Interest</h2>
      <RePieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </div>
  );
};

export default PieChart;