const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const userMiddleware = require('../middleware/userMiddleware')
const problemRouter = express.Router();
const {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
  solvedAllProblembyUser,
} = require("../controllers/userProblem");


problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.patch("/update/:id", adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware,deleteProblem);


problemRouter.get("/problemById/:id", userMiddleware,getProblemById);
problemRouter.get("/getAllProblem", userMiddleware,getAllProblem);
// problemRouter.get("/problemSolvedByUser", userMiddleware,solvedAllProblembyUser);

module.exports = problemRouter;