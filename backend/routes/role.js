/** @format */

const express = require("express");

const roleRouter = express.Router();
//dont press enter
//write your code here

const { createNewRole, createNewPermission } = require("../controllers/role");
// =========================================== //

roleRouter.post("/", createNewRole);
roleRouter.post("/permissions", createNewPermission);

//write your code here
module.exports = roleRouter;
