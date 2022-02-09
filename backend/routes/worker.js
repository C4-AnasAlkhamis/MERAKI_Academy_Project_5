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
} = require("../controllers/worker");
// =========================================== //

workerRouter.post("/", createNewWorker);
workerRouter.get("/", getAllWorkers);
workerRouter.get("/:id", getWorkerById);
workerRouter.get("/srv_id/:id", getWorkerByServiceId);

workerRouter.put("/:id", updateWorkerById);
workerRouter.delete("/:id", deleteWorkerById);

//write your code here
module.exports = workerRouter;
