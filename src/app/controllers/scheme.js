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

module.exports = {
  create,
};
