/** @format */

const express = require("express");

const cartRouter = express.Router();
//dont press enter
//write your code here
const {
  createNewCart,
  getCartById,
  deleteCartById,
} = require("../controllers/cart");
//   ========================================== //
cartRouter.post("/", createNewCart);
cartRouter.get("/:id", getCartById);
cartRouter.delete("/:id", deleteCartById);

//write your code here
module.exports = cartRouter;
