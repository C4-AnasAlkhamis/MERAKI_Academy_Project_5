import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import jwt from "jwt-decode";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setWorkerId } from "../../reducer/worker/index";
import "./chat.css";
const Chat = () => {
  const dispatch = useDispatch();

  const { token, worker_id } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      worker_id: state.workerReducer.worker_id,
    };
  });

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
  console.log(worker_id);
  socket.on("disconnect", () => {});
  return (
    <>
      {worker_id || messages.length ? (
        <div className="chat_box">
          <div className="chat_header">
            <i
              className="btn"
              onClick={() => {
                dispatch(setWorkerId(0));
                setMessages([]);
              }}
            >
              <AiOutlineCloseCircle />
            </i>
            <h3>messenger</h3>
          </div>

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
      ) : null}
    </>
  );
};

export default Chat;
