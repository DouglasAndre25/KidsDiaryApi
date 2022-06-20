const Sequelize = require("sequelize");

const { Model } = Sequelize;

class event extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        type: {
          type: Sequelize.ENUM,
          values: ["daily_info", "justification", "report"],
        },
        occurrence_date: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: "event",
      }
    );

    return this;
  }

  static associate(models) {}
}

module.exports = event;
