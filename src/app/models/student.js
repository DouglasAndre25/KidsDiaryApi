const Sequelize = require("sequelize");

const { Model } = Sequelize;

class student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        birthday: Sequelize.DATE,
        registration_number: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: "student",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.responsible, {
      foreignKey: "responsible_id",
      as: "responsible",
    });

    this.belongsToMany(models.Class, { through: "class_student" });
    this.hasMany(models.event, { foreignKey: "student_id" });
  }
}

module.exports = student;
