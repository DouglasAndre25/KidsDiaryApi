const { Router } = require("express");
const UserController = require("./app/controllers/user");
const ResponsibleController = require("./app/controllers/responsible");
const StudentController = require("./app/controllers/student");
const ClassController = require("./app/controllers/class");
const SchemeController = require("./app/controllers/scheme");

const authMiddleware = require("./app/middlewares/auth");

const routes = new Router();

routes.post("/user", UserController.create);
routes.post("/user/login", UserController.login);

routes.use(authMiddleware);

routes.get("/responsible", ResponsibleController.getAll);

routes.post("/student", StudentController.create);
routes.get("/student", StudentController.getAll);

routes.post("/class", ClassController.create);
routes.get("/class", ClassController.getAll);
routes.put("/class/:id", ClassController.update);
routes.delete("/class/:id", ClassController.exclude);

routes.post("/scheme", SchemeController.create);

module.exports = routes;
