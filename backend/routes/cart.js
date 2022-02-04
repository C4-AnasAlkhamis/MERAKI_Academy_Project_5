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
const authentication= require("../middleware/authentication");

//   ========================================== //
cartRouter.post("/", createNewCart);
<<<<<<< HEAD
cartRouter.get("/:id", authentication,getCartById);
=======
cartRouter.get("/",authentication, getCartById);
>>>>>>> cd486c44e3527e8f291e725a464b0721c8d393a5
cartRouter.delete("/:id", deleteCartById);

//write your code here
module.exports = cartRouter;
