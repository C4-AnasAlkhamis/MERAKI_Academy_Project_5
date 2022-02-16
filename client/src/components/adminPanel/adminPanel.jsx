/** @format */

import React from "react";
import "./adminPanel.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../reducer/login/index";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logoAdmin.png";
import {
  BiLogOut,
  BiHome,
  BiListCheck,
  BiAddToQueue,
  BiUser,
  BiUserCircle
} from "react-icons/bi";


//============================================================================
//import

//============================================================================

const AdminPanel = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="titleBar">
        <div className="logoAdmin">
          <img src={logo} />
        </div>
        <h1 id="adminName"><BiUserCircle/> {localStorage.getItem("userName")}</h1>
        <Link
          id="adminLogout"
          to={"/homePage"}
          onClick={() => {
            localStorage.clear();
            dispatch(logOut());
          }}>
          <BiLogOut /> logout
        </Link>
      </div>
      <div className="adminPanel">
        <div className="adminNavbar">
          <ul>
            <Link id="titleA" to={"/dashboard"}>
              <BiHome /> Dashboard
            </Link>
            <li className="titleUl">CATEGORIES</li>
            <li>
              <Link to={"/addCategory"}>
                <BiListCheck /> Show Category
              </Link>
              <br />
            </li>
            <li className="titleUl">ITEMS</li>
            <li>
              <Link to={"/addItems"}>
                <BiAddToQueue /> Add Item
              </Link>
              <br />
              <Link to={"/showItems"}>
                <BiListCheck /> Show Items
              </Link>
              <br />
            </li>
            <li className="titleUl">SERVICES</li>
            <li>
              <Link to={"/addService"}>
                <BiListCheck /> Show Services
              </Link>
              <br />
            </li>
            <li className="titleUl">USERS</li>
            <li>
              <Link to={"/showUsers"}>
                <BiUser /> Show Users
              </Link>
              <br />
              <Link to={"/showWorkers"}>
                <BiUser />
                Show Workers
              </Link>
              <br />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
