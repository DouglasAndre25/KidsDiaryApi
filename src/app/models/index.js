const Sequelize = require("sequelize");
const people = require("./people");
const responsible = require("./responsible");
const teacher = require("./teacher");

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
      .map((model) => {
        return model.associate && model.associate(this.connection.models);
      });
  }
}

module.exports = new Database();
