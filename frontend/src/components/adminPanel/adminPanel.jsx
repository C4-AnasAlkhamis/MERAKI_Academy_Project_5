/** @format */

import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
              <Link to={"/ShowCategories"}>Show Categories</Link>
              <br />
            </ul>
          </li>
          <li>ITEMS</li>
          <li>
            <ul>
              <Link to={"/addItems"}>Add Item</Link>
              <br />
              <Link to={"/ShowItems"}>Show Items</Link>
              <br />
            </ul>
          </li>
          <li>SERVICES</li>
          <li>
            <ul>
              <Link to={"/addService"}>Add Service</Link>
              <br />
              <Link to={"/ShowServices"}>Show Services</Link>
              <br />
            </ul>
          </li>
          <li>USERS</li>
          <li>
            <ul>
              <Link to={"/ShowUsers"}>Show Users</Link>
              <br />
              <Link to={"/ShowWorkers"}>Show Workers</Link>
              <br />
            </ul>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default AdminPanel;
