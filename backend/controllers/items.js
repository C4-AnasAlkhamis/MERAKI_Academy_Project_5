/** @format */

const connection = require("../database/db");

// This function create new item
const createNewItem = (req, res) => {
  const { image, title, description, category, price } = req.body;

  const query = `INSERT INTO items (image, title, description, category, price) VALUE (?,?,?,?,?)`;
  const data = [image, title, description, category, price];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `new item created`,
      result: result,
    });
  });
};

// // =================================================== // done

// This function get all items from items
const getAllItems = (req, res) => {
  const query = `SELECT * FROM items WHERE is_deleted = 0`;
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
        message: `No items Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the items`,
      items: result,
    });
  });
};
// // =================================================== // done

// This function delete Item By Id
const deleteItemById = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM items WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No item with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to delete item with id ${id}`,
      result: result,
    });
  });
};

// // =================================================== // done

// This function get Item By Id
const getItemById = (req, res) => {
  let { id } = req.query;

  const query = `select * FROM items WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No item with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to get item with id ${id}`,
      item: result,
    });
  });
};

// // =================================================== // done
// This function to update item by id.
const updateItemById = (req, res) => {
  const { image, title, description, category, price } = req.body;
  const id = req.params.id;

  const query = `UPDATE items SET img=?, title=?, descriptions=? , category_id = ? , price=? WHERE id=?;`;

  const data = [image, title, description, category, price, id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      res.status(500).json({
        success: false,
        massage: `The item : ${id} is not found`,
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: `the item updated`,
      results: results,
    });
  });
};

// // =================================================== // done
// This function to get item by Category_id.
const getItemByCategory_id = (req, res) => {
  let  category_id  = req.query.id;

  const query = `select * FROM items WHERE category_id = ?`;
  const data = [category_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No item with category_id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to get item with category_id ${id}`,
      item: result,
    });
  });
};

module.exports = {
  createNewItem,
  getAllItems,
  deleteItemById,
  getItemById,
  updateItemById,
  getItemByCategory_id
};
