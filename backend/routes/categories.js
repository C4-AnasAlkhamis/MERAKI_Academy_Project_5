/** @format */

const express = require("express");

const categoriesRouter = express.Router();
//dont press enter
//write your code here

const { createNewCategory } = require("../controllers/categories");
// =========================================== //
categoriesRouter.post("/", createNewCategory);

//write your code here
module.exports = categoriesRouter;
