module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("responsible", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      people_id: {
        type: Sequelize.INTEGER,
        reference: { model: "people", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("responsible");
  },
};
