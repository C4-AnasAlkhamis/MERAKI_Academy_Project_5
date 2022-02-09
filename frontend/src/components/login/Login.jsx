/** @format */

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { logIn, isAdmin } from "../../reducer/login/index";
import jwt from "jwt-decode";

import login from "../../image/login1.png";

import { useDispatch } from "react-redux";
// import LoginWG from "../LoginWG/LoginWG";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

  const verifyUser = async (e) => {
    e.preventDefault();
    //   post -> http://localhost:5000/login/
    await axios
      .post("http://localhost:5000/login", {
        email: email.toLowerCase(),
        password,
      })
      .then((result) => {
        if (result) {
          navigate(`/homePage`);
          localStorage.setItem("token", result.data.token);
          if (jwt(result.data.token).role == 1) {
            localStorage.setItem("isAdmin", true);
          }
          dispatch(logIn(result.data.token));
          setMessage("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        setMessage("Error happened while Login, please try again");
      });
  };

  return (
    <>
      <div className="login_box">
        <div className="group1">
          <div className="regImg1">
            <img className="image" src={login} />
          </div>
          <form onSubmit={verifyUser}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              placeholder="Password"
            />
            <button>Login</button>
            <span>{message}</span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
