/** @format */

const express = require("express");
const {
  CreateNewWishlist,
  getWishlistById,
  deleteItemInWishlistById,
} = require("../controllers/wishlists");

const { authentication } = require("../middleware/authentication");

const wishListRouter = express.Router();
//dont press enter
//write your code here

wishListRouter.post("/", authentication, CreateNewWishlist);
wishListRouter.get("/", authentication, getWishlistById);
wishListRouter.delete("/:id", deleteItemInWishlistById);

//write your code here
module.exports = wishListRouter;
