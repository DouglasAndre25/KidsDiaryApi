module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("class", {
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
      teacher_id: {
        type: Sequelize.INTEGER,
        reference: { model: "teacher", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("class");
  },
};
