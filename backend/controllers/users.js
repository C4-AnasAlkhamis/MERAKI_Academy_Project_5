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

// This function to get user by id.

const getUserById = (req, res) => {
    const id = req.query.id;
  
    const query = `SELECT * FROM users  WHERE id=?`;
    const data = [id];
  
    connection.query(query, data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server Error",
          err: err,
        });
      }
      if (results.length == 0) {
        res.status(404).json({
          success: false,
          massage: "The user Not found",
        });
      }
      res.status(200).json({
        success: true,
        massage: `The user ${id}`,
        results: results,
      });
    });
  };


  

  const updateUserById = (req, res) => {
    const { userName , email , password  } = req.body;
    const id = req.params.id;
  
    const query = `UPDATE users SET userName=?, email=?, password=? WHERE id=?;`;
  
    const data = [userName, email, password, id];
  
    connection.query(query, data, (err, results) => {
      if (err) {
        return res.status(404).json({
          success: false,
          massage: `Server error`,
          err: err,
        });
      }
      if (results.changedRows == 0) {
        res.status(404).json({
          success: false,
          massage: `The user : ${id} is not found`,
          err: err,
        });
      }
     
      res.status(201).json({
        success: true,
        massage: `the user updated`,
        results: results,
      });
    });
  };


  const deleteUserById = (req, res) => {
    const id = req.params.id;
  
    const query = `UPDATE users SET is_deleted=1 WHERE id=?;`;
  
    const data = [id];
  
    connection.query(query, data, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server Error",
          err: err,
        });
      }
      if (!results.changedRows) {
        return res.status(404).json({
          success: false,
          massage: `The user: ${id} is not found`,
          err: err,
        });
      }
    
      res.status(200).json({
        success: true,
        massage: `Succeeded to delete user with id: ${id}`,
        results: results,
      });
    });
  };















module.exports = {
  createNewUser,getUserById,updateUserById,deleteUserById
};
