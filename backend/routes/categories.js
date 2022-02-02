/** @format */

const express = require("express");

const categoriesRouter = express.Router();
//dont press enter
//write your code here

const {
  createNewCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/categories");
// =========================================== //
categoriesRouter.post("/", createNewCategory);
categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getCategoryById);

//write your code here
module.exports = categoriesRouter;
