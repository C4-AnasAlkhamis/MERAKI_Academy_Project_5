const connection = require("../database/db");

// =================================================== // done
// This function creates new role
const createNewRole = (req, res) => {
  const { role } = req.body;
  const query = `INSERT INTO roles (role) VALUE (?)`;
  const data = [role];

  connection.query(query, data, (err, role) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      message: `Success role created`,
      result: role,
    });
  });
};

module.exports = {
  createNewRole,

};
