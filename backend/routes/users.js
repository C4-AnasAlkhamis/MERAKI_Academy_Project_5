/** @format */

const express = require("express");
const {createNewUser} = require("../controllers/register");
const userRouter = express.Router();
//dont press enter
//write your code here


userRouter.post("/", createNewUser);

//write your code here
module.exports = userRouter;
