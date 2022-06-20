const Sequelize = require("sequelize");

const { Model } = Sequelize;

class scheme extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        planning_date: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: "scheme",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Class, { foreignKey: "class_id", as: "class" });
  }
}

module.exports = scheme;
