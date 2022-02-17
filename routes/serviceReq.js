/** @format */

const express = require("express");
const {
  createNewRequest,
  getAllRequestByWorkerId,
  deleteServiceReqById,
} = require("../controllers/serviceReq");
const serviceReqRouter = express.Router();
//dont press enter
//write your code here
const { authentication } = require("../middleware/authentication");

serviceReqRouter.post("/", createNewRequest);
serviceReqRouter.delete("/:id", deleteServiceReqById);
serviceReqRouter.get("/", authentication, getAllRequestByWorkerId);

//write your code here
module.exports = serviceReqRouter;
