const Sequelize = require("sequelize");
const { Model } = Sequelize;

class teacher extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.people, { foreignKey: "people_id", as: "people" });
  }
}

module.exports = teacher;