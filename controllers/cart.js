const connection = require("../database/db");
// =================================================== // done

// This function creates new cart
const createNewCart = (req, res) => {
  const { item_id } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO carts (user_id,item_id) VALUE (?,?)`;
  const data = [user_id, item_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `cart created`,
      result: result,
    });
  });
};
// =================================================== // done

// This function returns Cart By Id
const getCartById = (req, res) => {
  const id = req.token.userId;
  const query = `SELECT *, carts.id as cart_id ,COUNT( carts.item_id) AS count,SUM( items.price) AS total_price FROM carts JOIN items ON carts.item_id = items.id where carts.user_id =? GROUP BY 2`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `The carts with user ${id}`,
      result: result,
    });
  });
};

// =================================================== // done

// This function returns Cart By Id
const deleteCartById = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM carts WHERE id = ?`;
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
      message: `The cart with ${id} deleted`,
      result: result,
    });
  });
};
// =================================================== // done

// This function returns Cart By user_Id
const deleteCartByUserId = (req, res) => {
  const id = req.token.userId;
  const query = `DELETE FROM carts WHERE user_id = ?`;
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
      message: `The carts deleted successfully`,
      result: result,
    });
  });
};
module.exports = {
  createNewCart,
  getCartById,
  deleteCartById,
  deleteCartByUserId,
};
