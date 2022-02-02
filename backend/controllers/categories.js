const connection = require("../database/db");

// =================================================== // done

// This function creates new category
const createNewCategory = (req, res) => {
  const { category } = req.body;

  const query = `INSERT INTO categories (category) VALUE (?)`;
  const data = [category];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `category created`,
      result: result,
    });
  });
};

module.exports = {
  createNewCategory,
};
