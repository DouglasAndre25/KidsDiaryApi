const Sequelize = require("sequelize");

const { Model } = Sequelize;

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "class",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.teacher, { foreignKey: "teacher_id", as: "teacher" });
    this.belongsToMany(models.student, { through: "class_student" });

    this.hasMany(models.scheme, { foreignKey: "class_id", as: "class" });
  }
}

module.exports = Class;
