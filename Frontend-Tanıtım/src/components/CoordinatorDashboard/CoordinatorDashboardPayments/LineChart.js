import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { name: "Jan", expense: 20, income: 40 },
  { name: "Feb", expense: 30, income: 60 },
  { name: "Mar", expense: 50, income: 90 },
  { name: "Apr", expense: 20, income: 30 },
  { name: "May", expense: 30, income: 50 },
  { name: "Jun", expense: 40, income: 70 },
  { name: "Jul", expense: 50, income: 90 },
  { name: "Aug", expense: 40, income: 60 },
  { name: "Sep", expense: 30, income: 50 },
  { name: "Oct", expense: 40, income: 70 },
  { name: "Nov", expense: 60, income: 80 },
  { name: "Dec", expense: 30, income: 50 },
];

const LineChartComponent = () => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          cursor: "pointer",
        },
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#374151", margin: 0 }}
        >
          Balance Analytics
        </Typography>

        {/* Summary Dots */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {/* Expense Dot */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#ff4d4f",
              }}
            ></span>
            <Typography
              variant="body2"
              sx={{ color: "#6b7280", fontWeight: "bold" }}
            >
              Expense: <span style={{ color: "#ff4d4f" }}>$1,245</span>
            </Typography>
          </div>

          {/* Income Dot */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#52c41a",
              }}
            ></span>
            <Typography
              variant="body2"
              sx={{ color: "#6b7280", fontWeight: "bold" }}
            >
              Income: <span style={{ color: "#52c41a" }}>$1,356</span>
            </Typography>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 14, fill: "#6b7280" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 14, fill: "#6b7280" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#374151", fontWeight: "bold" }}
              itemStyle={{ color: "#6b7280" }}
              formatter={(value, name) => [`$${value}`, name]}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ff4d4f"
              strokeWidth={2}
              fill="url(#colorExpense)"
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#ff4d4f" }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#52c41a"
              strokeWidth={2}
              fill="url(#colorIncome)"
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#52c41a" }}
            />
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4d4f" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ff4d4f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#52c41a" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#52c41a" stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;