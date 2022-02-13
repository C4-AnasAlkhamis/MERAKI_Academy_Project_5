const connection = require("../database/db");
// =================================================== // done
// This function create new item
const createRate = (req, res) => {
  const { rate, item_id } = req.body;

  const query = `INSERT INTO rates (rate, item_id) VALUE (?,?)`;
  const data = [rate, item_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    return res.status(201).json({
      success: true,
      message: `new rate created`,
      result: result,
    });
  });
};
// =================================================== // done

// This function get all items from items
const getAllRate = (req, res) => {
  const query = `SELECT * FROM rates `;
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
        message: `No rate Yet`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `all the rate`,
      result: result,
    });
  });
};
module.exports = {
  createRate,
  getAllRate,
};
