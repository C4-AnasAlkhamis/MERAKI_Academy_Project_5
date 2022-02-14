/** @format */

import React from "react";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Bar
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        }}
        height={400}
        width={600}
      />
    </div>
  );
};

export default Dashboard;
