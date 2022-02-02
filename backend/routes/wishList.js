/** @format */

const express = require("express");
const {CreateNewWishlist,GetWishlistById,deleteItemInWishlistById} = require("../controllers/wishlists");

const wishListRouter = express.Router();
//dont press enter
//write your code here

wishListRouter.post("/", CreateNewWishlist);
wishListRouter.get("/", GetWishlistById);
wishListRouter.delete("/:id", deleteItemInWishlistById);












//write your code here
module.exports = wishListRouter;
