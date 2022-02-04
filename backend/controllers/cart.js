const connection = require("../database/db");
// =================================================== // done

// This function creates new cart
const createNewCart = (req, res) => {
  const { user_id, item_id } = req.body;

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
<<<<<<< HEAD

  console.log();
  const id = req.token.user_id;

  const query = `SELECT * FROM carts join items ON carts.item_id = items.id where carts.user_id =?`;
=======
  const id = req.token.userId;
  const query = `SELECT *, carts.id as cart_id FROM carts join items ON carts.item_id = items.id where carts.user_id =?`;
>>>>>>> cd486c44e3527e8f291e725a464b0721c8d393a5
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
module.exports = {
  createNewCart,
  getCartById,
  deleteCartById,
};
