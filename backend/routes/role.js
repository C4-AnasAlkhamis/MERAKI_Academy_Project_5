/** @format */

const express = require("express");

const roleRouter = express.Router();
//dont press enter
//write your code here

const { createNewRole } = require("../controllers/role");
// =========================================== //

roleRouter.post("/", createNewRole);

//write your code here
module.exports = roleRouter;
