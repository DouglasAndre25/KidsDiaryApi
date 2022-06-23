const Class = require("../models/class");
const student = require("../models/student");
const { connection } = require("../models");

const create = async (req, res) => {
  const transaction = await connection.transaction();
  try {
    const { body, userId } = req;
    const classResponse = await Class.create(
      {
        name: body.name,
        teacher_id: userId,
      },
      { transaction }
    );

    const studentsResponse = await student.findAll({
      where: {
        id: body.students,
      },
    });

    await classResponse.addStudent(studentsResponse);
    await transaction.commit();

    return res.send({
      data: classResponse,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  create,
};
