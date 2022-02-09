/** @format */

const express = require("express");

const workerRouter = express.Router();
//dont press enter
//write your code here

const {
    createNewWorker,
    getAllWorkers,
    getWorkerById,
    updateWorkerById,
    deleteWorkerById,
} = require("../controllers/worker");
// =========================================== //

workerRouter.post("/", createNewWorker);
workerRouter.get("/", getAllWorkers);
workerRouter.get("/:id", getWorkerById);
workerRouter.put("/:id", updateWorkerById);
workerRouter.delete("/:id", deleteWorkerById);

//write your code here
module.exports = workerRouter;
