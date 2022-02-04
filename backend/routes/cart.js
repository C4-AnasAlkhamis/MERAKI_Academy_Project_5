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
const authentication= require("../middleware/authentication");

//   ========================================== //
cartRouter.post("/", createNewCart);
cartRouter.get("/",authentication, getCartById);
cartRouter.delete("/:id", deleteCartById);

//write your code here
module.exports = cartRouter;
