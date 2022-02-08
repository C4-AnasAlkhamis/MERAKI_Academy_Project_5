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
// =================================================== // done

// This function creates new category
const updateCategory = (req, res) => {
  const id = req.params.id;
  const { category } = req.body;
  const query = `UPDATE categories SET category =?  WHERE id = ?`;
  const data = [category, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `category with id ${id} updated `,
      result: result,
    });
  });
};
// =================================================== // done

// This function returns the categories
const getAllCategories = (req, res) => {
  const query = `SELECT * FROM categories`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (!result) {
      return res.status(200).json({
        success: false,
        message: `No Categories Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `All the Categories`,
      result: result,
    });
  });
};
// =================================================== // done

// This function returns Category By Id
const getCategoryById = (req, res) => {
  let id = req.params.id;
  const query = `SELECT * FROM categories WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `The cart ${id}`,
      result: result,
    });
  });
};
// =================================================== // done

// This function delete Category By Id
const deleteCategoryById = (req, res) => {
  let id = req.params.id;
  const query = `DELETE FROM categories WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(200).json({
      success: true,
      message: `The category with ${id} deleted`,
      result: result,
    });
  });
};
module.exports = {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategory,
};
