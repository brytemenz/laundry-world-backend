const express = require('express');
const userRouter = express.Router();

const { getUserData } = require('../controllers/user.controller');
const userAuth = require('../middleware/user.auth');


userRouter.get('/data', userAuth, getUserData);

module.exports = userRouter;