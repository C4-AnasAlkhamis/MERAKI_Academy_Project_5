/** @format */

const express = require("express");
const {
  createNewRequest,
  getAllRequestByWorkerId,
} = require("../controllers/serviceReq");
const serviceReqRouter = express.Router();
//dont press enter
//write your code here

serviceReqRouter.post("/", createNewRequest);
serviceReqRouter.get("/:id", getAllRequestByWorkerId);

//write your code here
module.exports = serviceReqRouter;
