/** @format */

const express = require("express");

const itemsRouter = express.Router();
//dont press enter
//write your code here
const {
  createNewItem,
  getAllItems,
  deleteItemById,
  getItemById,
  updateItemById,
} = require("../controllers/items");

itemsRouter.post("/", createNewItem);
itemsRouter.get("/", getAllItems);
itemsRouter.delete("/:id", deleteItemById);
itemsRouter.get("/id", getItemById);
itemsRouter.put("/", updateItemById);

//write your code here
module.exports = itemsRouter;
