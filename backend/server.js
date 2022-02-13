/** @format */

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());

const PORT = 5000;

//import router
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

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
