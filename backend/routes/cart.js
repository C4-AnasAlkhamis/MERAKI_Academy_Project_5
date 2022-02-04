/** @format */

const express = require("express");

const cartRouter = express.Router();

const {authentication}= require("../middleware/authentication");
//dont press enter
//write your code here
const {
  createNewCart,
  getCartById,
  deleteCartById,
} = require("../controllers/cart");

//   ========================================== //
cartRouter.post("/", createNewCart);

cartRouter.get("/",authentication, getCartById);
cartRouter.delete("/:id", deleteCartById);

//write your code here
module.exports = cartRouter;
