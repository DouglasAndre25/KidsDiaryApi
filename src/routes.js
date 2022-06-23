const { Router } = require("express");
const UserController = require("./app/controllers/user");
const ResponsibleController = require("./app/controllers/responsible");
const StudentController = require("./app/controllers/student");

const authMiddleware = require("./app/middlewares/auth");

const routes = new Router();

routes.post("/user", UserController.create);
routes.post("/user/login", UserController.login);

routes.use(authMiddleware);

routes.get("/responsible", ResponsibleController.getAll);

routes.post("/student", StudentController.create);

module.exports = routes;
