/** @format */

const express = require("express");

const mailRouter = express.Router();
//dont press enter
//write your code here

const {
    createNewMail
} = require("../controllers/mail");
// =========================================== //

mailRouter.post("/", createNewMail);


//write your code here
module.exports = mailRouter;
