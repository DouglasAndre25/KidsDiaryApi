const Sequelize = require("sequelize");

const { Model } = Sequelize;

class teacher extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: "teacher",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.people, { foreignKey: "people_id", as: "people" });

    this.hasMany(models.Class, { foreignKey: "teacher_id", as: "teacher" });
    this.hasMany(models.event, { foreignKey: "teacher_id" });
  }
}

module.exports = teacher;
