const connection = require("../database/db");

const path = require("path");
const express = require("express");

const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
app.use(cors());
const buildPath = path.join(__dirname, "..", "build");
app.use(express.json());
app.use(express.static(buildPath));

// This function creates new mail
const createNewMail = async (req, res) => {
  const { to, subject, description } = req.body;

  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "c4project05@gmail.com",
      pass: "meraki@c4",
    },
  });
 
  const mailOptions = {
    from: "c4project05@gmail.com", 
    to: to, 
    subject: subject, 
    text: description

    
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ status: true, respMesg: "Email Sent Successfully", error });

      console.log(error);

    } else {
      res.json({ status: true, respMesg: "Email Sent Successfully" });
      console.log(true);

    }
  });
};

module.exports = {
  createNewMail,
};

