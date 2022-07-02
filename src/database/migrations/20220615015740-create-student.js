module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("student", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      registration_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      responsible_id: {
        type: Sequelize.INTEGER,
        reference: { model: "responsible", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("student");
  },
};
