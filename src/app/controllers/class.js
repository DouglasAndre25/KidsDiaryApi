const Class = require("../models/class");
const student = require("../models/student");
const teacher = require("../models/teacher");
const people = require("../models/people");
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

const getAll = async (req, res) => {
  console.log(req.userId);
  try {
    const classResponse = await Class.findAll({
      where: { teacher_id: req.userId },
      include: [
        {
          model: teacher,
          as: "teacher",
          include: [
            {
              model: people,
              as: "people",
              attributes: ["id", "name", "email", "birthday", "phone"],
            },
          ],
        },
        {
          model: student,
        },
      ],
    });

    return res.send({
      data: classResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  create,
  getAll,
};
