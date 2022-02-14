const { io } = require("../server");
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     method: ["GET", "POST"],
//   },
// });
io.on("connection", (socket) => {
    // socket.emit("connect", `${socket.id} in connected`);
  console.log(`${socket.id} in connected`);
    socket.on("SEND_MESSAGE", (data) => {
      console.log(data);
    });
});
