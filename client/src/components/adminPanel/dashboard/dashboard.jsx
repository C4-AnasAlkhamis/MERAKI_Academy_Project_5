/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./dashboard.css";

const Dashboard = () => {
  const [items, setItems] = useState("");

  const getAllItems = async () => {
    try {
      const res = await axios.get("/item");
      if (res.data.success) {
        const itemsByCategoryInStock = {};
        const itemsByCategoryOutOfStock = {};
        for (let item = 0; item < res.data.items.length; item++) {
          const element = res.data.items[item];
          if (element.is_deleted === 0) {
            if (!itemsByCategoryInStock[element.category_id]) {
              itemsByCategoryInStock[element.category_id] = 1;
            } else {
              itemsByCategoryInStock[element.category_id] += 1;
            }
          } else {
            if (!itemsByCategoryOutOfStock[element.category_id]) {
              itemsByCategoryOutOfStock[element.category_id] = 1;
            } else {
              itemsByCategoryOutOfStock[element.category_id] += 1;
            }
          }
        }
        setItems({ itemsByCategoryInStock, itemsByCategoryOutOfStock });
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
      }
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  let in_stock_1 = items ? items.itemsByCategoryInStock["1"] : 0;
  let in_stock_2 = items ? items.itemsByCategoryInStock["2"] : 0;
  let in_stock_3 = items ? items.itemsByCategoryInStock["3"] : 0;
  let in_stock_4 = items ? items.itemsByCategoryInStock["4"] : 0;

  let out_of_stock_1 = items ? items.itemsByCategoryOutOfStock["1"] : 0;
  let out_of_stock_2 = items ? items.itemsByCategoryOutOfStock["2"] : 0;
  let out_of_stock_3 = items ? items.itemsByCategoryOutOfStock["3"] : 0;
  let out_of_stock_4 = items ? items.itemsByCategoryOutOfStock["4"] : 0;

  const data = [
    {
      name: "Hand Tool",
      in_stock: in_stock_1,
      out_of_stock: out_of_stock_1,
      amt: 2400,
    },
    {
      name: "Power Tool",
      in_stock: in_stock_2,
      out_of_stock: out_of_stock_2,
      amt: 2400,
    },
    {
      name: "Safety Wear",
      in_stock: in_stock_3,
      out_of_stock: out_of_stock_3,
      amt: 2400,
    },
    {
      name: "Tool Storage",
      in_stock: in_stock_4,
      out_of_stock: out_of_stock_4,
      amt: 2400,
    },
  ];

  const data1 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
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
      {/* <div > */}
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
    // </div>
  );
};

export default Dashboard;
