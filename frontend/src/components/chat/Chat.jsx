import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = () => {
  const socket = io.connect("http://localhost:5000");
  socket.emit("SEND_MESSAGE", "hello");
  useEffect(() => {
    socket.on("SEND_MESSAGE", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <>
      <div>
        <h1>chat</h1>
      </div>
    </>
  );
};

export default Chat;
