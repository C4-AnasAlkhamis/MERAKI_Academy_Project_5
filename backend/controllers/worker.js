const connection = require("../database/db");
const jwt = require("jsonwebtoken");
// This function creates new worker
const createNewWorker = (req, res, next) => {
  const user_id = req.token.userId;
  const { service_id, address, phone, image } = req.body;
  const query = `INSERT INTO worker (user_id, service_id, address, phone,image ) VALUE (?,?,?,?,?)`;
  const data = [user_id, service_id, address, phone, image];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (result) {
      const userId = [user_id];
      const query = `UPDATE users SET role_id = 3 WHERE id =?;`;
      connection.query(query, userId, (err, result1) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: `Server Error`,
          });
        }

        next();
      });
    }
  });
};
// ============================== //
const changeToken = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT * FROM users WHERE id = ?`;
  const data = [user_id];
  connection.query(query, data, async (err, result) => {
    try {
      const payload = {
        userId: result[0].id,
        role: result[0].role_id,
        userName: result[0].user_name,
      };

      const options = {
        expiresIn: "60m",
      };
      const token = await jwt.sign(payload, process.env.SECRET, options);
      return res.status(200).json({
        success: true,
        message: `Valid login credentials`,
        token: token,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
  });
};
// This function returns all workers
const getAllWorkers = (req, res) => {
  const query = `SELECT * ,worker.id AS w_id,worker.image AS w_image FROM worker JOIN users ON worker.user_id = users.id JOIN services ON worker.service_id = services.id `;
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
  const id = req.token.userId;
  const query = `SELECT * FROM worker JOIN users ON worker.user_id = users.id  WHERE worker.user_id = ? AND worker.is_deleted = 0`;
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

// This function returns worker By Service Id
const getWorkerByServiceId = (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM worker JOIN users ON worker.user_id = users.id WHERE worker.service_id = ? `;
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
        message: `No Worker Match Entered Service ID`,
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
  const query = `UPDATE worker SET address =IF(${
    address != ""
  }, ?, address) , phone = IF(${phone != ""}, ?, phone) , image = IF(${
    image != ""
  }, ?, image) WHERE user_id = ?;`;
  const data = [address, phone, image, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    return res.status(202).json({
      success: true,
      message: `Worker with id ${id} updated successfully`,
      result: result,
    });
  });
};

// This function to delete worker By Id
const deleteWorkerById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE worker SET is_deleted = 1 WHERE id = ?;`;

  const data = [id];

  connection.query(query, data, (err, result) => {
    if (result) {
      const query = `UPDATE service_request SET is_deleted = 1  WHERE worker_id = ? `;
      const worker = [id];
      connection.query(query, data, (err, result) => {
        if (result) {
          const userId = [id];
          const query = `UPDATE users SET role_id = 2 WHERE id =?;`;
          connection.query(query, userId, (err, result1) => {
            if (err) {
              return res.status(500).json({
                success: false,
                massage: "Server Error",
                err: err,
              });
            }
            res.status(200).json({
              success: true,
              massage: `Succeeded to delete Worker with id: ${id}`,
              result: result,
            });
          });
        }
      });
    }
  });
};
module.exports = {
  createNewWorker,
  getAllWorkers,
  getWorkerById,
  updateWorkerById,
  deleteWorkerById,
  getWorkerByServiceId,
  changeToken,
};
