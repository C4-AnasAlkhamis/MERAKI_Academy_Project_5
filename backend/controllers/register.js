const bcrypt = require("bcrypt");
const connection = require("../database/db");
const secretSalt = process.env.SALT;

// This function to sign up new user .
const createNewUser = async (req, res) => {
  const { userName, email, password, role_id } = req.body;

  const hashingPass = await bcrypt.hash(password, 7);

  const query = `INSERT INTO users (user_name, email, password, role_id) VALUES (?,?,?,?)`;
  const data = [userName, email, hashingPass, role_id];

  connection.query(query, data, (err, results) => {
        // if (err) throw err;
        // if (results) {
        //   res.status(200).json({
        //     success: true,
        //     message: `Success user Added`,
        //     user: results,
        //   });
        // } else if (err.keyPattern) {
        //   return res.status(409).json({
        //     success: false,
        //     message: `The email already exists`,
        //   });
        // } else {
        //   res.status(500).json({
        //     success: false,
        //     message: `Server Error`,
        //     err: err,
        //   });
        // }

    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err: err,
      });
    }
   
    res.status(200).json({
      success: true,
      massage: "Success user Added",
      results: results,
    });
  });

};

module.exports = {
  createNewUser,
};
