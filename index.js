/** @format */

const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();
const app = express();
const db = require("./database/db");
const path = require("path");

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 5000;

const cartRouter = require("./routes/cart");
const categoriesRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");
const loginRouter = require("./routes/login");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/users");
const wishListRouter = require("./routes/wishList");

const serviceReqRouter = require("./routes/serviceReq");

const serviceRouter = require("./routes/service");
const workerRouter = require("./routes/worker");
const rateRouter = require("./routes/rate");

const mailRouter = require("./routes/mail");

//middleware
app.use("/cart", cartRouter);
app.use("/category", categoriesRouter);
app.use("/item", itemsRouter);
app.use("/login", loginRouter);
app.use("/role", roleRouter);
app.use("/user", userRouter);
app.use("/wishlist", wishListRouter);

app.use("/send_request", serviceReqRouter);

app.use("/service", serviceRouter);
app.use("/worker", workerRouter);
app.use("/rate", rateRouter);

app.use("/mail", mailRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const server = app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

module.exports = { io };

const chat = require("./controllers/chat");
