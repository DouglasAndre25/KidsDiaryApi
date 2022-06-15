module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("class_student", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      class_id: {
        type: Sequelize.INTEGER,
        reference: { model: "class", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        reference: { model: "student", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("class_student");
  },
};
