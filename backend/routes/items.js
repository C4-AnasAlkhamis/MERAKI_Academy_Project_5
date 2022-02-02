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

//Post http://localhost:5000/item/
//get http://localhost:5000/item/
//delete http://localhost:5000/item/
// http://localhost:5000/item/
itemsRouter.post("/", createNewItem);
itemsRouter.get("/", getAllItems);
itemsRouter.delete("/:id", deleteItemById);
itemsRouter.get("/id", getItemById);
itemsRouter.put("/", updateItemById);

//write your code here
module.exports = itemsRouter;
