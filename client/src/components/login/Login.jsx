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
import Swal from "sweetalert2";

const Login = (message) => {
  const wrongLogin = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      color: "red",
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = async (e) => {
    e.preventDefault();
    //   post -> /login/
    await axios
      .post("/login", {
        email: email.toLowerCase(),
        password,
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("userName", jwt(result.data.token).userName);
          setEmail("");
          setPassword("");
          if (jwt(result.data.token).role == 1) {
            localStorage.setItem("isAdmin", true);
            navigate(`/admin`);
          } else {
            navigate(`/homePage`);
          }
          dispatch(logIn(result.data.token));
        }
      })
      .catch((err) => {
        wrongLogin("Error happened while Login, please try again");
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
