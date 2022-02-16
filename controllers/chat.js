const { io } = require("../index");

let users = [];
const pushId = (user_id, socket_id) => {
  const isInclude = users.some((user) => user.user_id === user_id);
  if (!isInclude) {
    users.push({ user_id, socket_id });
  }
};
const deleteUser = (socket_id) => {
  users = users.filter((user) => user.socket_id !== socket_id);
};
const findUser = (id) => {
  return users.find((user) => {
    if (user.user_id === id) {
      return user;
    }
  });
};
io.on("connection", (socket) => {
  socket.on("USER", (user_id) => {
    pushId(user_id, socket.id);
    io.emit("allUsers", users);
  });
  socket.on("MESSAGE", ({ user_id, worker_id, message }) => {
    const worker = findUser(worker_id);
    io.to(worker.socket_id).emit("RECEIVE_MESSAGE", { user_id, message });
  });
  socket.on("disconnect", () => {
    deleteUser(socket.id);
    io.emit("allUsers", users);
  });
});
