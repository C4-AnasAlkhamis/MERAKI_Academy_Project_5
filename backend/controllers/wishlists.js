const connection = require("../database/db");

// This function creates new wishlists
const CreateNewWishlist = (req, res) => {
  const { item_id } = req.body;
  const user_id = req.token.userId;

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

// This function get  wishlists by user id
const getWishlistById = (req, res) => {
  const id = req.token.userId;

  const query = `SELECT *, wishlists.id As wishlist_id FROM wishlists join items ON wishlists.item_id = items.id where wishlists.user_id =?`;
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
      return res.status(404).json({
        success: false,
        massage: "The wishlist Not found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The wishlist for user id : ${id}`,
      results: results,
    });
  });
};

// This function delete item in wishlists by id

const deleteItemInWishlistById = (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM wishlists WHERE id = ?`;

  const data = [id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete wishlist with id: ${id}`,
      results: results,
    });
  });
};

module.exports = {
  CreateNewWishlist,
  getWishlistById,
  deleteItemInWishlistById,
};
