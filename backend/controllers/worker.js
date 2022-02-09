const connection = require("../database/db");

// This function creates new worker
const createNewWorker = (req, res) => {
  const { user_id, service_id, address, phone, image } = req.body;

  const query = `INSERT INTO services (user_id, service_id, address,phone,image ) VALUE (?,?,?,?,?)`;
  const data = [user_id, service_id, address, phone, image];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `Success Worker Created`,
      result: result,
    });
  });
};

// This function returns all workers
const getAllWorkers = (req, res) => {
  const query = `SELECT * FROM worker `;
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
        message: `No Worker Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `All the Worker Available`,
      result: result,
    });
  });
};

// This function returns worker By Id
const getWorkerById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM worker WHERE (id) = (?) `;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (result.length == 0) {
      return res.status(404).json({
        success: false,
        message: `No Worker Match Entered ID`,
      });
    }

    res.status(200).json({
      success: true,
      message: `The Worker With Id >>> ${id}`,
      result: result,
    });
  });
};

// This function to update worker by id
const updateWorkerById = (req, res) => {
  const id = req.params.id;
  const { address, phone, image } = req.body;
  const query = `UPDATE worker SET address =? , phone = ? , image = ? WHERE id = ?;`;
  const data = [address, phone, image, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result.id) {
      return res.status(404).json({
        success: false,
        message: `No Worker Match Entered ID`,
      });
    }
    res.status(202).json({
      success: true,
      message: `Worker with id ${id} updated successfully`,
      result: result,
    });
  });
};

// This function to delete worker By Id
const deleteWorkerById = (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM worker WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({
        success: false,
        massage: `The Worker with: ${id} is not found`,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to delete Worker with id: ${id}`,
      result: result,
    });
  });
};
module.exports = {
  createNewWorker,
  getAllWorkers,
  getWorkerById,
  updateWorkerById,
  deleteWorkerById,
};
