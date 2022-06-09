const { Router } = require("express");
const UserController = require('./app/controllers/user')

const routes = new Router();

routes.post("/user", UserController.create);

module.exports = routes;
