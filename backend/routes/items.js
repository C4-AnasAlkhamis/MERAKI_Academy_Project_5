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
  getFilteredItems,
  isDeleteItemById,
  getOutOfSItems,
} = require("../controllers/items");
const pushItem = require("../controllers/addItem");
//Post http://localhost:5000/item/
//get http://localhost:5000/item/
//delete http://localhost:5000/item/
//get http://localhost:5000/item/id?id=
//put http://localhost:5000/item/4
//put http://localhost:5000/item/stock/:id
//put http://localhost:5000/item/stock

itemsRouter.post("/", createNewItem);
itemsRouter.post("/push", pushItem);
itemsRouter.post("/filter", getFilteredItems);
itemsRouter.get("/", getAllItems);
itemsRouter.get("/stock", getOutOfSItems);
itemsRouter.delete("/:id", deleteItemById);
itemsRouter.get("/id", getItemById);
itemsRouter.put("/:id", updateItemById);
itemsRouter.put("/stock/:id", isDeleteItemById);

itemsRouter.get("/category/:id", getItemByCategory_id);

//write your code here
module.exports = itemsRouter;
