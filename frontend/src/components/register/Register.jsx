import "./register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logo from "../../image/cones.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const createUser = async (e) => {
    e.preventDefault();
    //   POST -> http://localhost:5000/user
    if (!userName || !email || !password || !repeatPassword) {
      setMessage("please fill in all inputs");
    } else if (repeatPassword === password) {
      await axios
        .post("http://localhost:5000/user", {
          user_name: userName.toLowerCase(),
          email: email.toLowerCase(),
          password,
        })
        .then((result) => {
          if (result) setMessage(result.data.message);
          setUserName("");
          setRepeatPassword("");
          setEmail("");
          setPassword("");
          setDone(true);
          navigate("/login");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    } else {
      setMessage("The password should be the same in the repeat password");
    }
  };
  return (
    <div className="register">
      <div className="group">
      <div className="logo">
          <img src={logo} />
        </div>
      <form onSubmit={createUser}>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          type="text"
          placeholder="UserName"
        />

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
        <input
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
          value={repeatPassword}
          type="Password"
          placeholder="Repeat password"
        />
        <button>Register</button>
        <span
          style={{
            color: `${done ? "#24dc3a" : "#dc2424"}`,
            textShadow: `1px 0 1px  ${done ? "#24dc3a" : "#dc2424"}`,
          }}
        >
          {message}
        </span>
      </form>
      </div>
    </div>
  );
};

export default Register;
//
