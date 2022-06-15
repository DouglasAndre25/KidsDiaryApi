module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("event", {
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
      type: {
        type: Sequelize.ENUM,
        values: ["daily_info", "justification", "report"],
        allowNull: false,
      },
      occurrence_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        reference: { model: "student", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        reference: { model: "teacher", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("event");
  },
};
