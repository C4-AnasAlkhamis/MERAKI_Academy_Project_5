/** @format */

const express = require("express");

const rateRouter = express.Router();

const { authentication } = require("../middleware/authentication");
//dont press enter
//write your code here
const { createRate, getAllItemRate } = require("../controllers/rate");

//   ========================================== //
rateRouter.post("/", createRate);
rateRouter.get("/", getAllItemRate);

//write your code here
module.exports = rateRouter;
