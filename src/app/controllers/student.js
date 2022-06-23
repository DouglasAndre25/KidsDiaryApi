const student = require("../models/student");
const responsible = require("../models/responsible");
const people = require("../models/people");

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
    const studentResponse = await student.findAll({
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
      ],
    });

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
};
