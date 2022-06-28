const Class = require("../models/class");
const scheme = require("../models/scheme");

const create = async (req, res) => {
  try {
    const { body } = req;

    let day;
    let month;
    let year;
    if (body.planning_date) {
      [day, month, year] = body.planning_date.split("/");
    }

    const schemeResponse = scheme.create({
      ...body,
      planning_date: body.planning_date ? `${year}-${month}-${day}` : undefined,
    });

    return res.send({
      data: schemeResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

const getAllByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const schemeResponse = await scheme.findAll({
      where: {
        class_id: classId,
      },
      include: {
        model: Class,
        as: "class",
      },
      order: [["planning_date", "DESC"]],
    });

    return res.send({
      data: schemeResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

const exclude = async (req, res) => {
  try {
    const { params } = req;

    const schemeResponse = await (
      await scheme.findOne({
        where: {
          id: params.id,
        },
      })
    ).destroy();

    return res.send({
      data: schemeResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  create,
  getAllByClass,
  exclude,
};
