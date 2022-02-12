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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




const Login = () => {


  const rightLogin = () => {
    Swal.fire({
      title: "Have a Nice Journey In Our Website.",
      text: "Welcome!",
      imageUrl:
        "https://englishlib.org/dictionary/img/wlibrary/w/605359b9ba5286.41705746.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };

  
  const wrongLogin = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fill The Right Data And Try Again",
      color: "red",
    });
  };






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
          rightLogin()

          localStorage.setItem("token", result.data.token);
          setMessage("");
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
        wrongLogin()
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
            {/* <span>{message}</span> */}
          </form>
        </div>
        {/* <form onSubmit={verifyUser}>
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
          {/* <span>{message}</span> */}
          {/* </form> } */}
      </div>


      {/* </div> */}
    </>
  );
};

export default Login;
