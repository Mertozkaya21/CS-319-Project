import React from "react";
import { useNavigate } from "react-router-dom";
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
  { name: "Jan", lastyear: 7, thisyear: 8 },
  { name: "Feb", lastyear: 6, thisyear: 9 },
  { name: "Mar", lastyear: 8, thisyear: 9 },
  { name: "Apr", lastyear: 4, thisyear: 10 },
  { name: "May", lastyear: 9, thisyear: 6 },
  { name: "Jun", lastyear: 8, thisyear: 4 },
  { name: "Jul", lastyear: 10, thisyear: 8 },
  { name: "Aug", lastyear: 9, thisyear: 9 },
  { name: "Sep", lastyear: 8, thisyear: 8 },
  { name: "Oct", lastyear: 9, thisyear: 9 },
  { name: "Nov", lastyear: 5, thisyear: 6 },
  { name: "Dec", lastyear: 6, thisyear: 5 },
];

const LineChartSatisfaction = () => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#374151", margin: 0 }}
        >
           Average Tour Satisfaction
        </Typography>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
              }}
            ></span>
            <Typography
              variant="body2"
              sx={{ color: "#6b7280", fontWeight: "bold" }}
            >
              Last Year: <span style={{ color: "#f59e0b" }}>1,245</span>
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            ></span>
            <Typography
              variant="body2"
              sx={{ color: "#6b7280", fontWeight: "bold" }}
            >
              This Year: <span style={{ color: "#ef4444" }}>1,356</span>
            </Typography>
          </div>
        </div>
      </div>
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
            />
            <Line
              type="monotone"
              dataKey="scheduled"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#f59e0b" }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#ef4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartSatisfaction;