/** @format */

import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./dashboard.css";
const Dashboard = () => {
  const data = [
    { name: "Categories", in_stock: 400, out_of_stock: 2400, amt: 2400 },
    { name: "Items", in_stock: 400, out_of_stock: 2400, amt: 2400 },
    { name: "Services", in_stock: 11, out_of_stock: 2400, amt: 2400 },
    { name: "Page A", in_stock: 22, out_of_stock: 2400, amt: 2400 },
    { name: "Page A", in_stock: 167, out_of_stock: 2400, amt: 2400 },
    { name: "Page A", in_stock: 400, out_of_stock: 2400, amt: 2400 },
  ];
  return (
    <div className="dashboard">
      <div className="dashboardTitle">
        <h1>DASHBOARD</h1>
      </div>
      <div className="groupBox">
        <div className="numBox"></div>
        <div className="numBox"></div>
        <div className="numBox"></div>
        <div className="numBox"></div>
      </div>
      <ResponsiveContainer width="50%" height="50%">
        <BarChart
          width={300}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="in_stock" fill="#82ca9d" />
          <Bar dataKey="out_of_stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
