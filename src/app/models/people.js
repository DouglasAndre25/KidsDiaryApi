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
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }
}

module.exports = people;
