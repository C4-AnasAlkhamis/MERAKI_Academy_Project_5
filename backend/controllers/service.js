const connection = require("../database/db");

// This function creates new Service
const createNewService = (req, res) => {
  const { title, description, image } = req.body;

  const query = `INSERT INTO services (title, description, image ) VALUE (?,?,?)`;
  const data = [title, description, image];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `Success Service Created`,
      result: result,
    });
  });
};

// This function returns all services
const getAllServices = (req, res) => {
  const query = `SELECT * FROM services `;
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
        message: `No Services Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `All the Services Available`,
      result: result,
    });
  });
};

// This function returns Service By Id
const getServiceById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM services WHERE (id) = (?) `;
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
        message: `No Services Match Entered ID`,
      });
    }

    res.status(200).json({
      success: true,
      message: `The Service With Id >>> ${id}`,
      result: result,
    });
  });
};

// This function to update Service by id
const updateServiceById = (req, res) => {
  const id = req.params.id;
  const { title, description, image } = req.body;
  const query = `UPDATE services SET title =IF(${
    title != ""
  }, ?, title) , description=IF(${
    description != ""
  }, ?, description) , image = IF(${
    image != undefined
  }, ?, image) WHERE id = ?;`;
  const data = [title, description, image, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(202).json({
      success: true,
      message: `Service with id ${id} updated successfully`,
      result: result,
    });
  });
};

// This function to delete Service By Id
const deleteServiceById = (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM services WHERE id=?;`;

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
        massage: `The service with: ${id} is not found`,
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to delete Service with id: ${id}`,
      result: result,
    });
  });
};
module.exports = {
  createNewService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
