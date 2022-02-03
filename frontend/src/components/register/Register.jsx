import "./register.css";
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const createUser = async (e) => {
    e.preventDefault();
    //   POST -> http://localhost:5000/user
    if (repeatPassword === password) {
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
          type="text"
          placeholder="LastName"
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
  );
};

export default Register;
//
