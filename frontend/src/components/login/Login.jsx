import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { logIn } from "../reducer/login/index";

import { useDispatch } from "react-redux";
// import LoginWG from "../LoginWG/LoginWG";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const verifyUser = async (e) => {
    e.preventDefault();
    //   post -> http://localhost:5000/login/
    await axios
      .post("http://localhost:5000/login", {
        email: email.toLowerCase(),
        password,
      })
      .then((result) => {
        navigate(`/home`);
        localStorage.setItem("token", res.data.token);
        dispatch(logIn(res.data.token));
        setMessage("");
      })
      .catch((err) => {
        setMessage("Error happened while Login, please try again");
      });
  };

  return (
    <>
      <div className="signIn">
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
        <LoginWG />
      </div>
    </>
  );
};

export default SignIn;
