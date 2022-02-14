/** @format */

const connection = require("../database/db");

// This function create new item
const createNewItem = (req, res) => {
  const { title, descriptions, img, price, category_id } = req.body;

  const query = `INSERT INTO items (img, title, descriptions, category_id, price) VALUE (?,?,?,?,?)`;
  const data = [img, title, descriptions, category_id, price];
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
  const query = `SELECT * FROM items `;
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

// This function get all items like value
const getFilteredItems = (req, res) => {
  const { value } = req.body;
  const query = `SELECT * FROM items WHERE items.title LIKE ?;`;
  const data = [value];
  connection.query(query, data, (err, result) => {
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
// =================================================== // done
// This function get all out of stock items

const getOutOfSItems = (req, res) => {
  const query = `SELECT * FROM items WHERE items.is_deleted = 1;`;
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
      result: result,
    });
  });
};
// // =================================================== // done

// This function update on is_deleted Item By Id
const isDeleteItemById = (req, res) => {
  const id = req.params.id;
  const { is_deleted, description } = req.body;
  const query = `UPDATE items SET is_deleted = ?,descriptions = ? WHERE id = ?`;
  const data = [is_deleted, description, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No item with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to update is_deleted item with id ${id}`,
      result: result,
    });
  });
};

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
      result: result,
    });
  });
};

// // =================================================== // done
// This function to update item by id.
const updateItemById = (req, res) => {
  const { image, title, description, category, price } = req.body;
  const id = req.params.id;
  const query = `UPDATE items SET img= IF(${image != ""}, ?, img), title= IF(${
    title != ""
  }, ?, title), descriptions=IF(${
    description != ""
  }, ?, descriptions) , category_id = IF(${
    category != ""
  }, ?, category_id) , price= IF(${price != ""}, ?, price) WHERE id=?;`;

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
      return res.status(500).json({
        success: false,
        massage: `The item : ${id} is not found`,
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: `the item updated`,
      result: results,
    });
  });
};

// // =================================================== // done
// This function to get item by Category_id.
const getItemByCategory_id = (req, res) => {
  let id = req.params.id;

  const query = `select * FROM items WHERE category_id = ?`;
  const data = [id];
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
// // =================================================== // done

// This function get all feedback
const getAllFeedback = (req, res) => {
  const query = `SELECT * FROM feedback `;
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
        message: `No feedback Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the feedback`,
      result: result,
    });
  });
};

// // =================================================== // done
// This function create new feedback
const createNewFeedback = (req, res) => {
  const { name, email, subject, feedback } = req.body;

  const query = `INSERT INTO feedback (name, email, subject, feedback) VALUE (?,?,?,?)`;
  const data = [name, email, subject, feedback];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    console.log(data);
    res.status(201).json({
      success: true,
      message: `new feedback created`,
      result: result,
    });
  });
};

module.exports = {
  createNewItem,
  getAllItems,
  deleteItemById,
  getItemById,
  updateItemById,
  getItemByCategory_id,
  getFilteredItems,
  isDeleteItemById,
  getOutOfSItems,
  getAllFeedback,
  createNewFeedback
};
