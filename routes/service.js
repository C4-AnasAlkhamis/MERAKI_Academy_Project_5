/** @format */

const express = require("express");

const serviceRouter = express.Router();
//dont press enter
//write your code here

const {
  createNewService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
} = require("../controllers/service");
// =========================================== //

serviceRouter.post("/", createNewService);
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:id", getServiceById);
serviceRouter.put("/:id", updateServiceById);
serviceRouter.delete("/:id", deleteServiceById);

//write your code here
module.exports = serviceRouter;
