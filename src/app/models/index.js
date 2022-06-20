const Sequelize = require("sequelize");
const Class = require("./class");
const people = require("./people");
const responsible = require("./responsible");
const student = require("./student");
const teacher = require("./teacher");
const event = require("./event");
const scheme = require("./scheme");

const databaseConfig = require("../../config/database")[
  process.env.NODE_ENV || "development"
];

const models = [people, teacher, responsible, student, Class, event, scheme];

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
