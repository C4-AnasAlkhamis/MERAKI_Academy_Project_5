/** @format */

const express = require("express");
const {
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllIUses,
  getAllUsersDashboard,
} = require("../controllers/users");
const userRouter = express.Router();
//dont press enter
//write your code here

userRouter.post("/", createNewUser);
userRouter.get("/", getUserById);
userRouter.get("/all", getAllIUses);
userRouter.get("/dashboard/all", getAllUsersDashboard);
userRouter.put("/", updateUserById);
userRouter.put("/delete/:id", deleteUserById);

//write your code here
module.exports = userRouter;
