const people = require("../models/people");
const responsible = require("../models/responsible");

const getAll = async (req, res) => {
  try {
    const responsibles = await responsible.findAll({
      include: [
        {
          model: people,
          as: "people",
          attributes: ["id", "name", "email", "birthday", "phone"],
        },
      ],
    });

    return res.send({
      data: responsibles,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  getAll,
};
