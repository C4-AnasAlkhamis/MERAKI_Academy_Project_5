/** @format */

const express = require("express");

const workerRouter = express.Router();
//dont press enter
//write your code here

const {
  createNewWorker,
  getAllWorkers,
  getWorkerById,
  getWorkerByServiceId,
  updateWorkerById,
  deleteWorkerById,
  changeToken,
  getAllWorkersDashboard,
} = require("../controllers/worker");
// =========================================== //
const { authentication } = require("../middleware/authentication");
workerRouter.get("/dashboard/all/worker", getAllWorkersDashboard);

workerRouter.post("/", authentication, createNewWorker, changeToken);
workerRouter.get("/", getAllWorkers);
workerRouter.get("/profile", authentication, getWorkerById);
workerRouter.get("/srv_id/:id", getWorkerByServiceId);

workerRouter.put("/", authentication, updateWorkerById);
workerRouter.put("/delete/:id", deleteWorkerById);

//write your code here
module.exports = workerRouter;
