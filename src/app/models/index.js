const people = require("./people");
const responsible = require("./responsible");
const teacher = require("./teacher");

const Sequelize = require("sequelize");
const databaseConfig = require("../../config/database")[
  process.env.NODE_ENV || "development"
];

const models = [people, teacher, responsible];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
