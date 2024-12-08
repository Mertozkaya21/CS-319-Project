import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart as RePieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const PieChart = () => {
  const [data] = useState([
    { name: 'Engineering', value: 30 },
    { name: 'Business Administration', value: 15 },
    { name: 'Art, Design, and Architecture', value: 20 },
    { name: 'Others', value: 35 },
  ]);

  const COLORS = ['#343aeb', '#ffa500', '#fc59a5', '#222222'];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/coordinatordashboardfeedbackanalysis');
  };

  return (
    <div className="pieChartWrapper">
      <h2 className="chartTitle">Departments of Interest</h2>
      <div
        className="pieChartContainer"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <RePieChart width={365} height={365}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            innerRadius={60} // Optional: creates a donut chart style
            label={({ value, percent }) => `${(percent * 100).toFixed(0)}%`} // Display percentage
            labelStyle={{
              fill: '#fff', // White text color
              fontSize: '14px',
              fontWeight: 'bold',
              textAnchor: 'middle',
            }}
            onMouseEnter={(entry, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'center',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      </div>
    </div>
  );
};

export default PieChart;