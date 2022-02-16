/** @format */

const express = require("express");

const cartRouter = express.Router();

const { authentication } = require("../middleware/authentication");
//dont press enter
//write your code here
const {
  createNewCart,
  getCartById,
  deleteCartById,
  deleteCartByUserId,
} = require("../controllers/cart");

//   ========================================== //
cartRouter.post("/", authentication, createNewCart);
cartRouter.get("/", authentication, getCartById);
cartRouter.delete("/:id", deleteCartById);
cartRouter.delete("/", authentication, deleteCartByUserId);

//write your code here
module.exports = cartRouter;
