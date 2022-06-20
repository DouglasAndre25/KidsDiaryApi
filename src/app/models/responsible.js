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

    this.hasMany(models.student, {
      foreignKey: "responsible_id",
      as: "responsible",
    });
  }
}

module.exports = responsible;
