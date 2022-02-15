import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import jwt from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import "./chat.css";
const Chat = () => {
  const { token, worker_id } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      worker_id: state.workerReducer.worker_id,
    };
  });
  console.log(worker_id);
  const [userId, setUserId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [user_id, setUser_id] = useState(jwt(token).userId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
  const sendMessage = () => {
    console.log(userId);
    socket.emit("MESSAGE", {
      user_id,
      worker_id: worker_id != 0 ? worker_id : userId,
      message,
    });
    setMessages((messages) => [...messages, { user_id, message }]);
    setMessage("");
    setRefresh(!refresh);
  };
  useEffect(() => {
    socket.emit("USER", user_id);
    socket.on("allUsers", (users) => {});
  }, [user_id]);
  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", (data) => {
      console.log(data);
      setUserId(data.user_id);
      setMessages((messages) => [...messages, data]);
    });
  }, [refresh]);

  socket.on("disconnect", () => {});
  return (
    <>
      <div className=" chat_box">
        <div className="message_box">
          {messages.length
            ? messages.map((message, index) => {
                return <p key={index}>{message.message}</p>;
              })
            : null}
        </div>
        <div className="input_chat_box">
          <input
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            type="text"
            placeholder="Message"
          />
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
