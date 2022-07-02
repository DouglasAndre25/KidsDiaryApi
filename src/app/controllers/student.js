const { Op } = require("sequelize");
const student = require("../models/student");
const responsible = require("../models/responsible");
const people = require("../models/people");
const { connection } = require("../models");
const Class = require("../models/class");
const event = require("../models/event");

const create = async (req, res) => {
  const { body } = req;

  let day;
  let month;
  let year;
  if (body.birthday) {
    [day, month, year] = body.birthday.split("/");
  }

  try {
    const studentResponse = await student.create({
      ...body,
      birthday: body.birthday ? `${year}-${month}-${day}` : undefined,
    });

    return res.send({
      data: studentResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

const getAll = async (req, res) => {
  try {
    const [classStudents] = await connection.query(
      "SELECT * FROM class_student"
    );

    const registeredStudent = classStudents.map(
      (classStudent) => classStudent.student_id
    );

    const queryParams = {
      include: [
        {
          model: responsible,
          as: "responsible",
          include: [
            {
              model: people,
              as: "people",
              attributes: ["id", "name", "email", "birthday", "phone"],
            },
          ],
        },
        {
          model: Class,
        },
        {
          model: event,
        },
      ],
    };
    if (req.query.showDesasociate) {
      queryParams.where = {
        id: {
          [Op.notIn]: registeredStudent,
        },
      };
    }

    if (req.query.responsibleId) {
      queryParams.where = {
        ...queryParams.where,
        responsible_id: req.query.responsibleId,
      };
    }

    const studentResponse = await student.findAll(queryParams);

    return res.send({
      data: studentResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

const exclude = async (req, res) => {
  try {
    const { params } = req;

    const studentResponse = await (
      await student.findOne({
        where: {
          id: params.id,
        },
      })
    ).destroy();

    return res.send({
      data: studentResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  create,
  getAll,
  exclude,
};
