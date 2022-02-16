const connection = require("../database/db");

// =================================================== // done

// This function create new item
const createNewRequest = (req, res) => {
  const { name, order_Detalis, address, phone, worker_id, email } = req.body;

  const query = `INSERT INTO service_request (name, order_Detalis, address, phone, worker_id,email) VALUE (?,?,?,?,?,?)`;
  const data = [name, order_Detalis, address, phone, worker_id, email];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `new request created`,
      result: result,
    });
  });
};

// // =================================================== // done

// This function get all items from items
const getAllRequestByWorkerId = (req, res) => {
  const id = req.token.userId;
  const query = `SELECT * FROM service_request WHERE worker_id = ? AND is_deleted = 0`;
  const data = [id];
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
        message: `No Request Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the Request with worker id ${id}`,
      result: result,
    });
  });
};
module.exports = {
  createNewRequest,
  getAllRequestByWorkerId,
};
