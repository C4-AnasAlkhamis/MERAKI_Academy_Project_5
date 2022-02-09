const connection = require("../database/db");

// This function creates new Service
const createNewWorker = (req, res) => {

  const { user_id, service_id, address,phone,image } = req.body;

  const query = `INSERT INTO services (user_id, service_id, address,phone,image ) VALUE (?,?,?,?,?)`;
  const data = [ user_id, service_id, address,phone,image ];
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

// This function returns all services
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

// This function returns Service By Id
const getWorkerById = (req, res) => {




};

// This function to update Service by id
const updateWorkerById = (req, res) => {

 






};

// This function to delete Service By Id
const deleteWorkerById = (req, res) => {
 





};
module.exports = {
  createNewWorker,
  getAllWorkers,
  getWorkerById,
  updateWorkerById,
  deleteWorkerById,
};
