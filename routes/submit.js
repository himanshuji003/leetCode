const express = require('express');
const submissionRoute = express.Router();
const userMiddleware = require('../middleware/userMiddleware')
const { submitCode } = require('../controllers/userSubmission')
submissionRoute.post("/submit", userMiddleware, submitCode);

module.exports = submissionRoute;