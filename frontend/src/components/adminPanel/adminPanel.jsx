/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//============================================================================
//import

//============================================================================

const AdminPanel = () => {
  return (
    <div className="adminPanel">
      <div className="adminNavbar">
        <ul>
          <Link to={"/dashboard"}>Dashboard</Link>
          <li>CATEGORIES</li>
          <li>
            <ul>
              <Link to={"/addCategory"}>Add Category</Link>
              <br />
            </ul>
          </li>
          <li>ITEMS</li>
          <li>
            <ul>
              <Link to={"/addItems"}>Add Item</Link>
              <br />
              <Link to={"/showItems"}>Show Items</Link>
              <br />
            </ul>
          </li>
          <li>SERVICES</li>
          <li>
            <ul>
              <Link to={"/addService"}>Add Service</Link>
              <br />
              <Link to={"/showServices"}>Show Services</Link>
              <br />
            </ul>
          </li>
          <li>USERS</li>
          <li>
            <ul>
              <Link to={"/showUsers"}>Show Users</Link>
              <br />
              <Link to={"/showWorkers"}>Show Workers</Link>
              <br />
            </ul>
          </li>
        </ul>
      </div>
      <Routes>

      </Routes>
    </div>
  );
};

export default AdminPanel;
