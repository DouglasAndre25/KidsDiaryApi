const Sequelize = require("sequelize");

const { Model } = Sequelize;
const bcrypt = require("bcryptjs");

class people extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        name: Sequelize.STRING,
        birthday: Sequelize.DATE,
        phone: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "people",
      }
    );

    this.addHook("beforeSave", async (people) => {
      if (people.password) {
        people.password = await bcrypt.hash(people.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasOne(models.teacher, { foreignKey: "people_id", as: "teacher" });
    this.hasOne(models.responsible, {
      foreignKey: "people_id",
      as: "responsible",
    });
  }
}

module.exports = people;
