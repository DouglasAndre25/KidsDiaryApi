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

const update = async (req, res) => {
  const transaction = await connection.transaction();
  try {
    const { body, userId, params } = req;

    const currentClass = await Class.findOne({
      where: {
        id: params.id,
      },
    });

    const classResponse = currentClass.update(
      {
        name: body.name,
        teacher_id: userId,
      },
      { transaction }
    );

    currentClass.setStudents(body.students);
    await transaction.commit();

    return res.send({
      data: classResponse,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ message: error, error: true });
  }
};

const exclude = async (req, res) => {
  try {
    const { params } = req;

    const classResponse = await (
      await Class.findOne({
        where: {
          id: params.id,
        },
      })
    ).destroy();

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
  update,
  exclude,
};
