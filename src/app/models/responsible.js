const Sequelize = require("sequelize");

const { Model } = Sequelize;

class responsible extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: "responsible",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.people, { foreignKey: "people_id", as: "people" });
  }
}

module.exports = responsible;
