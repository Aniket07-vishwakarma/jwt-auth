const express = require('express');
const app = express.Router();
const userController = require("./../controller/controller");
const auth = require('./../middleware/auth');

app.post("/register", userController.register);
app.post("/login", userController.login);
app.post("/welcome", auth, userController.welcome);

module.exports = app;