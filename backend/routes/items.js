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
  getItemByCategory_id,
} = require("../controllers/items");
const pushItem = require("../controllers/addItem");
//Post http://localhost:5000/item/
//get http://localhost:5000/item/
//delete http://localhost:5000/item/
//get http://localhost:5000/item/id?id=
//put http://localhost:5000/item/4
itemsRouter.post("/", createNewItem);
itemsRouter.post("/push", pushItem);

itemsRouter.get("/", getAllItems);
itemsRouter.delete("/:id", deleteItemById);
itemsRouter.get("/id", getItemById);
itemsRouter.put("/:id", updateItemById);
itemsRouter.get("/:category_id", getItemByCategory_id);

//write your code here
module.exports = itemsRouter;
