const connection = require("../database/db");

// This function creates new wishlists
const CreateNewWishlist = (req, res) => {
 
  const { item_id,user_id } = req.body;

  const query = `INSERT INTO wishlists (item_id, user_id) VALUES (?,?)`;
  const data = [item_id, user_id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "something went wrong while creating a new wishlist",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "The wishlist has been created successfully ",
      results: results,
    });
  });
};

const GetWishlistById = (req, res) => {
  const id = req.query.id;

  const query = `SELECT item_id FROM wishlists WHERE user_id = ?`;
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
        massage: "The wishlist Not found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The wishlist for ${id}`,
      results: results,
    });
  });
};

const deleteItemInWishlistById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE wishlists SET is_deleted=1 WHERE id=?;`;

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
        massage: `The item: ${id} is not found`,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to delete item with id: ${id}`,
      results: results,
    });
  });
};

module.exports = {
  CreateNewWishlist,
  GetWishlistById,
  deleteItemInWishlistById,
};
