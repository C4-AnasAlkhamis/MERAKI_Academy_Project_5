/** @format */

const express = require("express");
const { createNewRequest } = require("../controllers/serviceReq");
const serviceReqRouter = express.Router();
//dont press enter
//write your code here

serviceReqRouter.post("/", createNewRequest);

//write your code here
module.exports = serviceReqRouter;
