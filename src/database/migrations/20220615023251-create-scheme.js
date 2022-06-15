module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("scheme", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      planning_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      class_id: {
        type: Sequelize.INTEGER,
        reference: { model: "class", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("scheme");
  },
};
